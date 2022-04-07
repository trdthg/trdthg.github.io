# 关于本网站

## deploy 脚本

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
