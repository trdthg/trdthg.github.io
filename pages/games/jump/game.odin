// 游戏逻辑。桌面版和 web 版共用这一个包。
//
// 注意：这里【不能】有阻塞式主循环（`for !WindowShouldClose() {}`）。
// web 上主循环由 emscripten 的 requestAnimationFrame 驱动，见 main_web/index_template.html。

package game

import "core:c"
import rl "vendor:raylib"

run: bool

init :: proc() {
	run = true
	rl.InitWindow(800, 450, "Odin + Raylib on Web")
	rl.SetTargetFPS(60)
}

update :: proc() {
	rl.BeginDrawing()
	rl.ClearBackground(rl.RAYWHITE)
	rl.DrawText("Have a good day!", 190, 200, 20, rl.GREEN)
	rl.EndDrawing()
}

shutdown :: proc() {
	rl.CloseWindow()
}

// web 上浏览器窗口大小变化时由 main_web 转发过来。
// 不想要可缩放的话，把 SetWindowSize 去掉即可。
parent_window_size_changed :: proc(w, h: int) {
	rl.SetWindowSize(c.int(w), c.int(h))
}

should_run :: proc() -> bool {
	when ODIN_OS != .JS {
		// web 上不要调 WindowShouldClose：它内部有一个 16ms 的 sleep
		if rl.WindowShouldClose() {
			run = false
		}
	}
	return run
}
