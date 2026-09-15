package gee

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Context struct {
	W http.ResponseWriter // 响应数据
	R *http.Request       // 请求数据
	// req
	Path   string            // 路径
	Method string            // 方法
	Params map[string]string // 模糊匹配参数
	// res
	StatusCode int

	middlewares []HandleFunc // 中间件
	i           int          // 现在执行的中间件
}

func newContext(w http.ResponseWriter, r *http.Request) *Context {
	return &Context{
		W:      w,
		R:      r,
		Path:   r.URL.Path,
		Method: r.Method,
		i:      -1,
	}
}

func (c *Context) Next() {
	// 手动 Next，不能处理没有调用 Next 的中间件
	// c.middlewares[c.i](c)
	c.i += 1
	for ; c.i < len(c.middlewares); c.i++ {
		c.middlewares[c.i](c)
	}
}

func (c *Context) GetForm(k string) string {
	return c.R.FormValue(k)
}
func (c *Context) GetQuery(k string) string {
	return c.R.URL.Query().Get(k)
}
func (c *Context) GetParam(k string) string {
	v, _ := c.Params[k]
	return v
}

func (c *Context) SetHeader(k string, v string) {
	c.W.Header().Set(k, v)
}
func (c *Context) SetStatus(code int) {
	c.W.WriteHeader(code)
}

func (c *Context) HTML(code int, html string) {
	c.SetHeader("Content-Type", "text/html")
	c.SetStatus(code)
	c.W.Write([]byte(html))
}
func (c *Context) String(code int, format string, values ...interface{}) {
	c.SetHeader("Content-Type", "text/plain")
	c.SetStatus(code)
	c.W.Write([]byte(fmt.Sprintf(format, values...)))
}
func (c *Context) Fail(code int, err string) {
	c.i = len(c.middlewares)
	c.JSON(code, H{"message": err})
}

type H map[string]interface{}

func (c *Context) JSON(code int, obj interface{}) {
	c.SetHeader("Content-Type", "text/html")
	c.SetStatus(code)
	encoder := json.NewEncoder(c.W)
	if err := encoder.Encode(obj); err != nil {
		http.Error(c.W, err.Error(), 500)
	}
}
func (c *Context) Data(code int, data []byte) {
	c.SetStatus(code)
	c.W.Write(data)
}
