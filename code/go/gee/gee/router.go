package gee

import (
	"net/http"
	"strings"
)

type router struct {
	handlers map[string]HandleFunc
	roots    map[string]*node
}

func newRouter() *router {
	return &router{
		// 键: {methos}-{pattern}
		handlers: make(map[string]HandleFunc),
		// 每个方法（method）对应一个 trie 树
		roots: make(map[string]*node),
	}
}

func (r *router) addRoute(method string, pattern string, handler HandleFunc) {
	parts := parsePattern(pattern)
	if _, ok := r.roots[method]; !ok {
		r.roots[method] = &node{}
	}
	// trie
	r.roots[method].insert(pattern, parts, 0)
	// handler
	k := method + "-" + pattern
	r.handlers[k] = handler
}

func (r *router) getRoute(method string, pattern string) (*node, map[string]string) {
	// 找到 method 对应的前缀树
	root, ok := r.roots[method]
	if !ok {
		return nil, nil
	}

	// 获取当前要寻找的节点们
	searchPattern := parsePattern(pattern)

	// 直接找到对应的 node
	n := root.search(searchPattern, 0)
	if n == nil {
		return nil, nil
	}

	// 准备返回值
	params := make(map[string]string)

	// 将查询到的 pattern 和传递的 pattern 一一对比，并找出模糊匹配的值，保存在数组中
	parts := parsePattern(n.pattern)
	for i, part := range parts {
		if part[0] == ':' {
			params[part[1:]] = searchPattern[i]
		}
		if part[0] == '*' && len(part) > 1 {
			params[part[1:]] = strings.Join(searchPattern[i:], "/")
			break
		}
	}
	return n, params
}

func (r *router) handle(c *Context) {
	n, params := r.getRoute(c.Method, c.Path)

	// r.handlers[k](c)
	// 不直接执行了，不管查没查到方法，都把 handle 作为中间件添加到末尾
	if n == nil {
		c.middlewares = append(c.middlewares, func(c *Context) {
			c.String(http.StatusNotFound, "404 NOT FOUND: %s\n", c.Path)
		})
	} else {
		c.Params = params
		k := c.Method + "-" + n.pattern
		c.middlewares = append(c.middlewares, r.handlers[k])
	}
	c.Next()
}
