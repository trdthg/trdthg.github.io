// 桌面入口。构建：./build_desktop.sh
//
// 先跑通桌面版再折腾 web：桌面能跑说明游戏逻辑没问题，
// 之后 web 出问题就只可能是 emscripten 那一层，排查范围小很多。

package main_desktop

import "core:log"
import game ".."

main :: proc() {
	context.logger = log.create_console_logger()

	game.init()
	for game.should_run() {
		game.update()
	}
	game.shutdown()
}
