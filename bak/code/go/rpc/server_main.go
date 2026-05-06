package main

import (
	"gogo/server"
	"io"
	"log"
	"net"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
)

func main() {
	// rpc_test()
	// httprpc_test()
	// jsonrpc_test()
	httpjsonrpc_test()
}

func rpc_test() {
	rpc.RegisterName("MathService", new(server.MathService))
	l, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal("", err)
	}
	// 1. rpc
	rpc.Accept(l)
}

func httprpc_test() {
	rpc.RegisterName("MathService", new(server.MathService))
	l, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal("", err)
	}
	// 2. http
	rpc.HandleHTTP()
	http.Serve(l, nil)
}

func jsonrpc_test() {
	rpc.RegisterName("MathService", new(server.MathService))
	l, err := net.Listen("tcp", ":1234")
	if err != nil {
		log.Fatal("", err)
	}
	// 3. jsonrpc
	for {
		conn, err := l.Accept()
		if err != nil {
			log.Printf("jsonrpc.Serve Accept: ", err.Error())
		}
		jsonrpc.ServeConn(conn)
	}
}

func httpjsonrpc_test() {
	rpc.RegisterName("MathService", new(server.MathService))
	http.HandleFunc(rpc.DefaultRPCPath, func(w http.ResponseWriter, r *http.Request) {
		conn, _, err := w.(http.Hijacker).Hijack()
		if err != nil {
			log.Printf("rpchijack", r.RemoteAddr, ":", err.Error())
			return
		}
		io.WriteString(conn, "HTTP/1.0"+" 200 Connected to JSON RPC"+"\n\n")
		jsonrpc.ServeConn(conn)
	})
	l, err := net.Listen("tcp", "localhost:1234")
	if err != nil {
		log.Printf("oh1", err.Error())
	}
	http.Serve(l, nil)
}
