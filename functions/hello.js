// 中间件 A
export function onRequest(context) {
    context.data.user = { id: 1, name: 'Alice' };
    return context.next();
}

// 主函数
export function onRequest(context) {
    // 可以读取到中间件 A 设置的数据
    const user = context.data.user;
    return new Response(`Hello, ${user.name}!`);
}