/**
 * 用户相关接口
 */
const user = require("../../controller/user.js")

module.exports = function(router) {
	router.all('/user/login', user.userLogin)
	router.all('/user/isLogin', user.isLogin)
}