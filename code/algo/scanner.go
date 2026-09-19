// 藏宝洞里面有 N(N≤100) 堆金币，
// 第 i 堆金币的总重量和总价值分别是 m_i,v_i (1≤m i ​ ,v i ​ ≤100)。
// 阿里巴巴有一个承重量为 T(T≤1000) 的背包，
// 但并不一定有办法将全部的金币都装进去。
// 他想装走尽可能多价值的金币。
// 所有金币都可以随意分割，分割完的金币重量价值比（也就是单位价格）不变。
// 请问阿里巴巴最多可以拿走多少价值的金币？
package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	sc := NewScanner()
	// n, m := sc.GetMatrix()
	n, m := sc.GetVec()
	fmt.Println(n, m)
}

type Scanner struct {
	reader bufio.Reader
	buf    []string
	index  int
	buff   []byte
	temp   string
}

func NewScanner() Scanner {
	return Scanner{
		reader: *bufio.NewReader(os.Stdin),
		buf:    []string{},
		index:  0,
		buff:   []byte{},
	}
}

func (s *Scanner) next() *Scanner {
	for {
		if len(s.buf) != 0 {
			next := s.buf[s.index]
			s.index += 1
			if s.index == len(s.buf) {
				s.buf = s.buf[:0]
			}
			s.temp = next
			return s
		} else {
			s.buff, _, _ = s.reader.ReadLine()
			s.buf = strings.Fields(string(s.buff))
			s.buff = s.buff[:0]
			s.index = 0
		}
	}
}

func (s *Scanner) NextStr() string {
	return s.next().temp
}

func (s *Scanner) NextInt() int {
	res, _ := strconv.Atoi(s.next().temp)
	return res
}

func (s *Scanner) GetVec() (int, []int) {
	n := 0
	n = s.NextInt()
	arr := make([]int, n)
	for i := 0; i < n; i++ {
		arr[i] = s.NextInt()
	}
	return n, arr
}

func (s *Scanner) GetMatrix() (int, [][]int) {
	n := 0
	n = s.NextInt()
	arr := make([][]int, n)
	for i := range arr {
		arr[i] = make([]int, n)
	}
	for i := 0; i < n; i++ {
		for j := 0; j < n; j++ {
			arr[i][j] = s.NextInt()
		}
	}
	return n, arr
}
