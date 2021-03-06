# CI/CD

ð¤¤è¿ä¸è¥¿ç®ç´å¤ªæ£äºï¼

## èªå¨é¨ç½² Github Page

- è¿éä½¿ç¨ source åæ¯ä½ä¸ºåææ¡£çåæ¯
- push åèªå¨ build (è¿éä½¿ç¨`borales/actions-yarn@v2.3.0`ï¼å¦æä½¿ç¨ npmï¼éè¦`set-node`)
- å°æåå¥½çæä»¶åå¸å° master åæ¯ä¸ (ä½¿ç¨`peaceiris/actions-github-pages@v3.1.12`)

```yml
name: Github Page

on:
  push:
    branches:
     - source

jobs:
  build-and-deploy:
    # è¿è¡ç¯å¢
    runs-on: ubuntu-latest
    # å¼å§ job
    steps:
      # from [actions/checkout](https://github.com/actions/checkout#checkout-v2)
      # This action checks-out your repository under $GITHUB_WORKSPACE, so your workflow can access it.
      # å±äºæ¯å¿è¦éé¡¹äºï¼è½å¤æ¿å°å½ååæ¯ï¼ å¯¹åºè¿éå°±æ¯ source åæ¯
      - uses: actions/checkout@v2

      # ä½¿ç¨ yarn

      # å®è£ä¾èµ
      - name: Install dependencies
        uses: borales/actions-yarn@v2.3.0
        with:
          cmd: install # will run `yarn install` command

      - name: Build
        uses: borales/actions-yarn@v2.3.0
        with:
          cmd: build # will run `yarn build` command

      # æ disk æä»¶åå¸å°å¦ä¸ä¸ª branch
      - name: Deploy with <GitHub Pages v3>
        uses: peaceiris/actions-github-pages@v3.1.12
        with:
          # åå¸å°å½åä»åº
          github_token: ${{ secrets.GITHUB_TOKEN }}
          # ç main åæ¯
          publish_branch: main
          # è¦åå¸çæä»¶å¤¹
          publish_dir: ./docs/.vuepress/dist
```

## èªå¨ Release

- å®ä¾ä½¿ç¨ dev ä½ä¸ºå¼ååæ¯
- å½ push ææ ç­¾æ¶ï¼æ release çæä»¶èªå¨åå¸ (`softprops/action-gh-release@v1`)
- åæ¶æåæ¯åæ­¥å° `master` ä¸ (`tretuna/sync-branches@1.4.0`)

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
