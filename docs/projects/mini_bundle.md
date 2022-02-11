# 实现一个mini-bundle

```js
const fs = require('fs');
const path = require('path');
const babylon = require('babylon');
const traverse = require('babel-traverse').default;
const babel = require('babel-core');

let ID = 0;

// 根据文件名，拿到该文件的信息，包括id，code(转换后的), requirements
function createAsset(filename) {

    // 通过fs引入入口文件
    const content = fs.readFileSync(filename, 'utf8');

    // 解析出语法树
    const ast = babylon.parse(content, {
        sourceType: 'module'
    });

    // 拿到所有的import依赖
    const dependencies = [];

    traverse(ast, {
        ImportDeclaration: (({ node }) => {
            dependencies.push(node.source.value);
        })
    });

    const id = ID++;

    const code = babel.transformFromAst(ast, null, {
        // presets告诉babel转换的方法
        // env指 babel-preset-env插件，确保转换的代码能够在所有浏览器上运行
        presets: ['env']
    })

    return {
        id,
        filename,
        dependencies,
        code
    }
}

// 创建一个Array，里面是所有的依赖，每一个Node用mapping保存依赖之间的关系
function createGraph(entry) {
    // 通过入口文件开始, 拿到所有文件
    const mainAsset = createAsset(entry);

    // 保存所有的依赖
    const queue = [mainAsset];

    for (const asset of queue) {
        const dirname = path.dirname(asset.filename)

        asset.mapping = {}

        asset.dependencies.forEach(relativePath => {
            const absolutePath = path.join(dirname, relativePath);

            const child = createAsset(absolutePath);

            // 每个Node用一个map存储他依赖的对象
            asset.mapping[relativePath] = child.id;

            queue.push(child);
        });
    }

    return queue;
}

function bundle(graph) {
    // 构造参数（超大的）
    // 参数整体是一个Object，下面拼接了Object里的所有键值对，如下：
    // id: [code, mapping]
    // code最外层还套上了一个function
    let modules = ``;

    graph.forEach(mod => {
        modules += `${mod.id}: [
            function(require, module, exports) {
                ${mod.code.code}
            },
            ${JSON.stringify(mod.mapping)}
        ],`;
    });

    const result = `
        // 最外面是一层自调用函数，传入了上面构造的参数
        (function(modules) {
            // 通过文件的id，
            function require(id) {
                // 通过文件获得文件的函数和依赖map
                const [fn, mapping] = modules[id];
                // 通过依赖的id，在mapping中找到对应的文件名，接着直接调用require
                function localRequire(relativePath) {
                    return require(mapping[relativePath]);
                }
                // 保存export
                const module = { exports: {} };
                // 调用函数
                fn(localRequire, module, module.exports);
                return module.exports;
            }
            // 从入口文件开始
            require(0)
        })({${modules}});
    `;

    return result;
}

const graph = createGraph('./example/entry.js')
console.log(graph);
const result = bundle(graph);
console.log(result);

fs.writeFileSync('./app.js', result.toString());
```