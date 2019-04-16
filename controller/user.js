const { responseFormatter, getParams } = require("../utils/index.js") //	格式化输出方法、获取参数方法
const { logHandle } = require("../utils/logs.js") //  上一章记录操作日志的方法
const handleDB = require("../utils/handleDb.js") //  操作数据库方法

// 用户登录接口
async function userLogin(ctx, next) {
    var params = getParams(ctx.request)
    try {
        let sql = "select * from user where username=? and password=?"
        let data = await handleDB(sql, [params.username, params.password]);
        // 记录登录日志
        logHandle({
            title: '用户登录',
            sql,
            params,
            data
        });
        if (data.length) {
            // 存入session信息(最终会存在数据库中)
            ctx.session = {
                isLogin: true,
                userId: data[0].userId,
                userName: data[0].username,
                nickName: data[0].nickname
            }
            ctx.body = responseFormatter(0, '登录成功!');
        } else {
            ctx.body = responseFormatter(201);
        }
    } catch (err) {
        ctx.body = responseFormatter(103, err);
    }
}

// 检测用户是否登录接口
async function isLogin(ctx, next) {
    if (ctx.session && ctx.session.isLogin) {
        ctx.body = responseFormatter(0, {
            nickName: ctx.session.nickName
        });
    } else {
        ctx.body = responseFormatter(202);
    }
}

module.exports = {
    isLogin,
    userLogin
}