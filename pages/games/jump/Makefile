# Odin + Raylib → 桌面 / Web 构建
#
# 依赖：
#   odin     —— 官方 release 解压后的目录，加进 PATH
#   emcc     —— 只有 web 目标需要。brew install emscripten
#               （或者装 emsdk，然后 source ~/emsdk/emsdk_env.sh）
#
# 用法：
#   make desktop      桌面版 → build/desktop/jump
#   make run          编译并运行桌面版（先跑通它，再折腾 web）
#   make web          web 版  → build/web/{index.html,index.js,index.wasm,odin.js}
#   make serve        本地起 http server 预览 web 版（http://localhost:8000）
#   make clean

ODIN_ROOT   := $(patsubst %/,%,$(shell odin root 2>/dev/null))
OUT_DESKTOP := build/desktop
OUT_WEB     := build/web
RAYLIB_WASM := $(ODIN_ROOT)/vendor/raylib/wasm/libraylib.web.a
RAYGUI_WASM := $(ODIN_ROOT)/vendor/raylib/wasm/libraygui.a

.PHONY: all desktop run web serve clean

all: desktop web

# ---------- 桌面版 ----------

desktop:
	@mkdir -p $(OUT_DESKTOP)
	odin build main_desktop -out:$(OUT_DESKTOP)/jump
	@echo "完成 → $(OUT_DESKTOP)/jump"

run: desktop
	./$(OUT_DESKTOP)/jump

# ---------- Web 版 ----------

web:
	@command -v odin >/dev/null || { echo "✗ 找不到 odin，检查 PATH"; exit 1; }
	@command -v emcc >/dev/null || { echo "✗ 找不到 emcc：brew install emscripten，或 source ~/emsdk/emsdk_env.sh"; exit 1; }
	@test -f "$(RAYLIB_WASM)" || { echo "✗ 缺少 $(RAYLIB_WASM)"; echo "  Homebrew 版 Odin 不带 wasm 库（政策上禁止分发预编译二进制），请改用官方 release 包"; exit 1; }
	@mkdir -p $(OUT_WEB)
	@echo "[1/3] odin: 编译到目标文件（不链接）"
	odin build main_web -target:js_wasm32 -build-mode:obj -o:speed \
		-define:RAYLIB_WASM_LIB=env.o -define:RAYGUI_WASM_LIB=env.o \
		-out:$(OUT_WEB)/jump.wasm.obj
	@echo "[2/3] emcc: 链接 + 生成 html/js/wasm"
	emcc -o $(OUT_WEB)/index.html $(OUT_WEB)/jump.wasm.obj \
		$(RAYLIB_WASM) $(RAYGUI_WASM) \
		-sEXPORTED_RUNTIME_METHODS=['HEAPF32'] \
		-sUSE_GLFW=3 \
		-sWARN_ON_UNDEFINED_SYMBOLS=0 \
		-sASSERTIONS \
		--shell-file main_web/index_template.html
	@echo "[3/3] 拷贝 odin.js（js_wasm32 运行时，模板里 <script src=\"odin.js\">）"
	@cp $(ODIN_ROOT)/core/sys/wasm/js/odin.js $(OUT_WEB)/
	@rm -f $(OUT_WEB)/jump.wasm.obj
	@echo "完成 → $(OUT_WEB)/index.html"

serve: web
	@cd $(OUT_WEB) && python3 -m http.server 8000

clean:
	rm -rf build web
