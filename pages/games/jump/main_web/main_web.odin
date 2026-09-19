// Web 入口。这三个 proc 由 main_web/index_template.html 调用。
//
// 为什么要存 web_context：emscripten 从 JS 调进来的时候没有 Odin 的隐式 context，
// 而 raylib / 分配器 / 日志都要用 context，所以自己存一份，每次进来先装回去。

package main_web

import "base:runtime"
import "core:c"
import "core:mem"
import game ".."

@(private = "file")
web_context: runtime.Context

@(export)
main_start :: proc "c" () {
	context = runtime.default_context()

	// 必须换成 emscripten 的 allocator：
	// Odin 自带的 wasm allocator 和 emscripten 的内存管理会打架，
	// 不换会 panic: wasm_allocator: initial memory could not be allocated
	context.allocator = emscripten_allocator()
	runtime.init_global_temporary_allocator(1 * mem.Megabyte)

	web_context = context
	game.init()
}

@(export)
main_update :: proc "c" () -> bool {
	context = web_context
	game.update()
	return game.should_run()
}

@(export)
main_end :: proc "c" () {
	context = web_context
	game.shutdown()
}

@(export)
web_window_size_changed :: proc "c" (w, h: c.int) {
	context = web_context
	game.parent_window_size_changed(int(w), int(h))
}
