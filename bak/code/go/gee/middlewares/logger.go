package middlewares

import (
	g "demo/gee"
	"log"
	"time"
)

func Logger() g.HandleFunc {
	return func(c *g.Context) {
		t := time.Now()
		c.Next()
		log.Printf("[%d] %s in %v", c.StatusCode, c.R.RequestURI, time.Since(t))
	}
}
