curDate=$(date "+%Y-%m-%d")
curTime=$(date "+%H:%M:%S")

git add .
git commit -s -m "commit: $curDate $curTime"
# git push
