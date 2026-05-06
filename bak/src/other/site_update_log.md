# 网站更新日志

## v4 mdbook

2023.4.24 Docusaurus 懒得折腾了，mdbook 比较熟，还能通过模板引用代码文件，就用它了。

## v3 Docusaurus

2022.10.21 从 vuepress2 迁移到 Docusaurus

## v2 vuepress2

迁移到 vite 后的构建速度是真滴快！

## v1 vuepress1

基于 typora 处理图片

```sh
# rm -rf docs/.vuepress/dist
cd vuePressBlog
# 生成静态文件
pnpm run build

# 图片源修改
rm docs/.vuepress/public/assets/img/*
cp /home/trthg/.config/Typora/typora-user-images/* docs/.vuepress/public/assets/img/

# md 引用图片路径修改
sed -i "s/\/home\/trthg\/.config\/Typora\/typora-user-images/\/assets\/img/g" `grep -rl "/assets/img" ./`

# # /* 会忽略。开头的文件   /. 不会
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
curTime=$(date "+%H:%M:%S")
# # git init
cd ..
git add .
git commit -s -m "commit: $curDate $curTime"
git push -u origin main
```
