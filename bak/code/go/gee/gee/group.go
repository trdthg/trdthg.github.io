package gee

type RouterGroup struct {
	prefix      string       // 前缀
	engine      *Engine      // 资源永远是由 engine 同一调度
	middlewares []HandleFunc // 支持中间件
	parent      *RouterGroup // group 嵌套
}

func (g *RouterGroup) Use(middlewares ...HandleFunc) {
	g.middlewares = append(g.middlewares, middlewares...)
}

func (g *RouterGroup) Group(prefix string) *RouterGroup {
	e := g.engine
	// 从原有 group 派生出新的 group
	newGroup := &RouterGroup{
		prefix: g.prefix + prefix,
		parent: g,
		engine: e,
	}
	e.groups = append(e.groups, newGroup)
	return newGroup
}
func (g *RouterGroup) addRoute(method string, pattern string, handler HandleFunc) {
	// 主要就是拼接了一下 路由
	pattern = g.prefix + pattern
	g.engine.router.addRoute(method, pattern, handler)
}
func (g *RouterGroup) Get(pattern string, handler HandleFunc) {
	g.addRoute("GET", pattern, handler)
}
func (g *RouterGroup) Post(pattern string, handler HandleFunc) {
	g.addRoute("POST", pattern, handler)
}
