package gee

import (
	"strings"
)

type node struct {
	pattern  string  // 该路径上是否有路由
	part     string  // 当前节点
	children []*node // 字节点
	isWalid  bool    // 是否精确匹配
}

func (n *node) matchChild(part string) *node {
	for _, node := range n.children {
		if node.part == part || node.isWalid {
			return node
		}
	}
	return nil
}

func (n *node) matchChildren(part string) []*node {
	res := make([]*node, 0)
	for _, node := range n.children {
		if node.part == part || node.isWalid {
			res = append(res, node)
		}
	}
	return res
}

func (n *node) insert(pattern string, parts []string, height int) {
	// 当到最后一个节点时，为 trie 树添加 pattern
	if len(parts) == height {
		n.pattern = pattern
		return
	}
	// 拿到当前的 字符串 片段
	part := parts[height]
	// 看看有没有匹配的节点
	child := n.matchChild(part)
	if child == nil {
		// 没有匹配的节点，就插入新的节点
		child = &node{
			part:    part,
			isWalid: part[0] == ':' || part[0] == '*',
		}
		n.children = append(n.children, child)
	}
	// 递归调用
	child.insert(pattern, parts, height+1)
}

func (n *node) search(parts []string, height int) *node {
	// 如果当前路径片段是 * 就不用继续递归
	if len(parts) == height || strings.HasPrefix(n.part, "*") {
		if n.pattern == "" {
			return nil
		}
		return n
	}
	// 现在的 part
	part := parts[height]
	// trie 树的下一层
	children := n.matchChildren(part)
	for _, child := range children {
		result := child.search(parts, height+1)
		if result == nil {
			continue
		}
		return result
	}
	return nil
}

func parsePattern(pattern string) []string {
	parts := strings.Split(pattern, "/")
	res := make([]string, 0)
	for _, part := range parts {
		if part == "" {
			continue
		}
		res = append(res, part)
		if part[0] == '*' {
			break
		}
	}
	return res
}
