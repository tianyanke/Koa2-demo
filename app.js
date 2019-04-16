const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const mysqlConfig = require('./config/config.js').database
const logsUtil = require('./utils/logs.js');

const index = require('./routes/index')
const api = require('./routes/api.js')

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(views(__dirname + '/views', {
    // extension: 'pug'
    extension: 'html' //html 后缀的模板
}))

//  配置session
app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(mysqlConfig),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24, // cookie有效时长
        overwrite: false
    }
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date(); // 响应开始时间
    let intervals; // 响应间隔时间
    try {
        await next();
        intervals = new Date() - start;
        logsUtil.logResponse(ctx, intervals); //记录响应日志
    } catch (error) {
        intervals = new Date() - start;
        logsUtil.logError(ctx, error, intervals); //记录异常日志
    }
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(api.routes(), api.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app