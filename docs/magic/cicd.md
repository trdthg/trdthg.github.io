# CI/CD

🤤这东西简直太棒了！

## 自动部署 Github Page
- 这里使用source分支作为写文档的分支
- push后自动build (这里使用`borales/actions-yarn@v2.3.0`，如果使用npm，需要`set-node`)
- 将打包好的文件发布到master分支上 (使用`peaceiris/actions-github-pages@v3.1.12`)
```yml
name: Github Page

on:
  push:
    branches:
     - source

jobs:
  build-and-deploy:
    # 运行环境
    runs-on: ubuntu-latest
    # 开始job
    steps:
      # from [actions/checkout](https://github.com/actions/checkout#checkout-v2)
      # This action checks-out your repository under $GITHUB_WORKSPACE, so your workflow can access it.
      # 属于是必要选项了, 能够拿到当前分支， 对应这里就是source分支
      - uses: actions/checkout@v2

      # 使用yarn

      # 安装依赖
      - name: Install dependencies
        uses: borales/actions-yarn@v2.3.0
        with:
          cmd: install # will run `yarn install` command

      - name: Build
        uses: borales/actions-yarn@v2.3.0
        with:
          cmd: build # will run `yarn build` command

      # 把disk文件发布到另一个branch
      - name: Deploy with <GitHub Pages v3>
        uses: peaceiris/actions-github-pages@v3.1.12
        with:
          # 发布到当前仓库
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # 的main分支
          publish_branch: main
          # 要发布的文件夹
          publish_dir: ./docs/.vuepress/dist
```


## 自动 Release
- 实例使用dev作为开发分支
- 当push有标签时，把release的文件自动发布 (`softprops/action-gh-release@v1`)
- 同时把分支同步到 `master` 上 (`tretuna/sync-branches@1.4.0`)
```yml
name: Release

on:
  push:
    branches: [ dev ]
    tags:
      - "v*"

env:
  CARGO_TERM_COLOR: always

jobs:
  release:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2

    - name: Build
      run: cargo build --verbose

    - name: Run tests
      run: cargo test --verbose

    - name: Release
      uses: softprops/action-gh-release@v1
      with:
        files: ./target/debug/yarm

    - name: Opening pull request
      uses: tretuna/sync-branches@1.4.0
      with:
        GITHUB_TOKEN: ${{secrets.GITHUB_TOKEN}}
        FROM_BRANCH: "dev"
        TO_BRANCH: "master"
```