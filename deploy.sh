# rm -rf docs/.vuepress/dist
cd vuePressBlog
# 生成静态文件
yarn build

# 图片源修改
rm docs/.vuepress/public/assets/img/*
cp /home/trthg/.config/Typora/typora-user-images/* docs/.vuepress/public/assets/img/
# md引用图片路径修改
sed -i "s/\/home\/trthg\/.config\/Typora\/typora-user-images/\/assets\/img/g" `grep -rl "/assets/img" ./`

# # /* 会忽略.开头的文件   /. 不会
rm -r ../assets
rm -r ../java
rm -r ../other
rm -r ../js
rm -r ../python
rm -r ../rust
rm -r ../ioclub
rm -r ../magic
rm ../*.html
# rm ../*.png
# rm ../*.jpg

mv docs/.vuepress/dist/* ../

curDate=$(date "+%Y-%m-%d")
curTime=$(date "+%H-%M-%S")
# # git init
cd ..
git add .
git commit -s -m "commit: $curDate $curTime"
git push -u origin main

# git pull --rebase origin git@github.com:trdthg/trdthg.github.io.git main
# git commit -m 'Initial commit'
# # 如果你想要部署到 https://USERNAME.github.io
# git push -f git@github.com:trdthg/trdthg.github.io.git main

# 如果发布到 https://USERNAME.github.io/<REPO>  REPO=github上的项目
# git push -f git@github.com:USERNAME/<REPO>.git master:gh-pages
