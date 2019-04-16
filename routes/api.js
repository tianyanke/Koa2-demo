const router = require('koa-router')();
const user = require('./api/user.js');

router.prefix('/api');   // 统一定义接口前缀都为api, 之后写的所有接口都在api下。

user(router);

/* 测试接口 */
router.get('/', function (ctx, next) {
    ctx.body = {
        code: 0,
        data: null,
        msg: "接口请求成功",
        request: ctx.originalUrl
    }
})

/* 404 */
router.all('/*', function (ctx, next) {
    ctx.body = {
        code: 1001,
        ctx: ctx,
        data: null,
        msg: "接口不存在",
        request: ctx.originalUrl
    }
})
module.exports = router
