const router = require('koa-router')()

const logsHandle = require("../utils/logs.js").logHandle;
const logsInfo = require("../utils/logs.js").logInfo;


router.get('/', async (ctx, next) => {
	await ctx.render('index', {
		title: 'Hello Koa 2!'
	})
})

router.get('/string', async (ctx, next) => {
	ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
	logsHandle("请求了json接口")  // 假设此处需要记录敏感操作的日志
	logsInfo("请求了json接口")    // 假设此处需要在控制台打印日志
	ctx.body = {
		title: 'koa2 json'
	}
})

module.exports = router