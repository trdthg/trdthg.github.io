# !/usr/bin/env sh

# 确保脚本抛出遇到的错误

# rm -rf docs/.vuepress/dist
# 生成静态文件
yarn build

# /* 会忽略.开头的文件   /. 不会
# rm -r ../trdthg.github.io/*
rm -r ../assets
rm -r ../java
rm -r ../other
rm -r ../js
rm -r ../python
rm -r ../rust
rm -r ../ioclub
rm -r ../magic
rm ../*.html
rm ../*.png
rm ../*.jpg

mv docs/.vuepress/dist/* ../
