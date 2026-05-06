package main

import (
	"bufio"
	"errors"
	"fmt"
	"gogo/server"
	"io"
	"log"
	"net"
	"net/http"
	"net/rpc"
	"net/rpc/jsonrpc"
)

func main() {
	httpjsonrpc_test()
	// // client, err := rpc.Dial("tcp", "localhost:1234")
	// client, err := rpc.DialHTTP("tcp", "localhost:1234")
	// // client, err := jsonrpc.Dial("tcp", "localhost:1234")
	// if err != nil {
	// 	log.Fatal("err:", err)
	// }
	// args := server.Args{A: 7, B: 8}
	// var reply int
	// err = client.Call("MathService.Add", args, &reply)
	// if err != nil {
	// 	log.Fatal("???", err)
	// }
	// fmt.Printf("%d + %d = %d", args.A, args.B, reply)
}

func httpjsonrpc_test() {
	client, err := DialHTTP("tcp", "localhost:1234")
	if err != nil {
		log.Fatal("err:", err)
	}
	args := server.Args{A: 7, B: 8}
	var reply int
	err = client.Call("MathService.Add", args, &reply)
	if err != nil {
		log.Fatal("???", err)
	}
	fmt.Printf("%d + %d = %d", args.A, args.B, reply)

}

func DialHTTP(network, address string) (*rpc.Client, error) {
	return DialHTTPPath(network, address, rpc.DefaultRPCPath)
}

func DialHTTPPath(network, address, path string) (*rpc.Client, error) {
	conn, err := net.Dial(network, address)
	if err != nil {
		return nil, err
	}
	// io.WriteString(conn, "CONNECT "+path+" HTTP/1.0\n\n")
	method := "GET"
	io.WriteString(conn, method+" "+path+" HTTP/1.0\n\n")

	resp, err := http.ReadResponse(bufio.NewReader(conn), &http.Request{Method: method})
	if err == nil && resp.Status == "200 Connected to JSON RPC" {
		// return NewClient(conn), nil
		return jsonrpc.NewClient(conn), nil
	}
	if err == nil {
		err = errors.New("unexpected HTTP response: " + resp.Status)
	}
	conn.Close()
	return nil, &net.OpError{
		Op:   "dial-http",
		Net:  network + " " + address,
		Addr: nil,
		Err:  err,
	}
}
