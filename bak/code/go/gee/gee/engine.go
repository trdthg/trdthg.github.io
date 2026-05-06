package gee

import (
	"net/http"
	"strings"
)

type Engine struct {
	*RouterGroup                // embeded type
	router       *router        // 路由及对应的 handler
	groups       []*RouterGroup // 所有分组
}

type HandleFunc = func(c *Context)

func New() *Engine {
	e := &Engine{
		router: newRouter(),
	}
	e.RouterGroup = &RouterGroup{engine: e}
	e.groups = []*RouterGroup{e.RouterGroup}
	return e
}

func (g *Engine) Get(path string, handler HandleFunc) {
	g.router.addRoute("GET", path, handler)
}

func (g *Engine) Post(path string, handler HandleFunc) {
	g.router.addRoute("POST", path, handler)
}

func (g *Engine) Run(addr string) {
	http.ListenAndServe(addr, g)
}

func (e *Engine) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	c := newContext(w, r)
	// 拿到这条路经上的所有中间件
	var middlewares []HandleFunc
	for _, group := range e.groups {
		if strings.HasPrefix(r.URL.Path, group.prefix) {
			middlewares = append(middlewares, group.middlewares...)
		}
	}
	c.middlewares = middlewares
	e.router.handle(c)
}
