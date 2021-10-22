# !/usr/bin/env sh

# 确保脚本抛出遇到的错误

# rm -rf docs/.vuepress/dist
# 生成静态文件
# yarn build

# /* 会忽略.开头的文件   /. 不会
# rm -r ../trdthg.github.io/*
rm -r ../assets
rm -r ../java
rm -r ../other
rm -r ../js
rm -r ../python
rm -r ../rust
rm ../*.html
rm ../*.png
rm ../*.jpg

mv docs/.vuepress/dist/* ../

# git init
cd ..
git add .
git commit -s -m "commit"
git push -u origin main

# git pull --rebase origin git@github.com:trdthg/trdthg.github.io.git main
# git commit -m 'Initial commit'
# # 如果你想要部署到 https://USERNAME.github.io
# git push -f git@github.com:trdthg/trdthg.github.io.git main

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages
