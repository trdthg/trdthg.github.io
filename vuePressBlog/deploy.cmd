@REM npm run build
cp -r docs/.vuepress/dist/* ../trdthg.github.io
cd ../trdthg.github.io
git add -A
git commit -m "commit"
git push -u origin main