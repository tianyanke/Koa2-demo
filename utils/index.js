/**
 * @name responseFormatter   格式化输出响应结果
 * @params { @Number 状态码, @Object 返回数据}
 * @return { @Object }
 * @author HoChine.
 */

const errorCode = require("../config/errorCode.js")
exports.responseFormatter = function (code, data) {
    return {
        code: code,
        msg: errorCode[code],
        data: data || null
    }
}

/**
 * @name getParams 获取url参数
 * @params { @String url}
 * @return { @Object }
 * @author HoChine.
 */

let getUrlParams = function (url) {
    let paramsList = {};
    if (!url) {
        console.log("url 为必填项");
        return paramsList;
    }
    let paramsStr = url.split("?")[1];
    let params = paramsStr ? paramsStr.split("&") : [];
    params.forEach(function (item) {
        let temp = item.split("=");
        temp[0] ? paramsList[temp[0]] = temp[1] : '';
    })
    
    return paramsList;
}
exports.getUrlParams = getUrlParams

/**
 * @name getParams 根据请求方式不同获取参数
 * @params { @Object ctx.request}
 * @return { @Object }
 * @author HoChine.
 */
exports.getParams = function (request) {
    if (request.method === "GET") {
        return getUrlParams(request.url)
    }else{
        return request.body
    }
}

/**
 * @name encryptPassword 自定义加密密码
 * @params { @String password}
 * @return { @String }
 * @author HoChine.
 */


exports.encryptPassword = function(password){
    if(password){
        var ASCII = 1; 
        for (var i = 0; i < password.length; i++) {
            ASCII += (password[i].charCodeAt() * 123456789);
        }
        return ASCII.toString(32);
    }else{
        return 'admin'
    }
}

/**
 * @name checkNecessaryParams 检查必要参数
 * @params { @Object 待检查对象, @Array 待检查参数列表}
 * @return { @Boolean isExile}
 * @author HoChine.
 */

exports.checkNecessaryParams  = function(object, keyArr){
    let resultArr = [];
    keyArr.forEach(function (item, index) {
        if(!object[item]){
            resultArr.push(item);
        }
    })
    if(resultArr.length){
        return "The lack of the following must be parameters！ ['" + resultArr.join("','") + "'] "
    }else{
        return false
    }
}

/**
 * @name ISODateString ISO时间格式化
 * @params { @Date Object 时间对象}
 * @return { @String ISO时间字符}
 * @author HoChine.
 */

exports.ISODateString = function(d) {
    function pad(n){
        return n<10 ? '0'+n : n
    }
    return d.getUTCFullYear()+'-'
    + pad(d.getUTCMonth()+1)+'-'
    + pad(d.getUTCDate())+'T'
    + pad(d.getUTCHours())+':'
    + pad(d.getUTCMinutes())+':'
    + pad(d.getUTCSeconds())+'Z'
}

/**
 * @name formatTime 时间格式化
 * @params { @String 时间戳}
 * @return { @String 格式化时间}
 * @author HoChine.
 */

exports.formatTime = function (timeStr) {
    var fmt = "yyyy-MM-dd hh:mm:ss";
    if (timeStr) {
        let date = new Date(timeStr)
        let o = {
            "M+": date.getMonth() + 1,                 //月份
            "d+": date.getDate(),                    //日
            "h+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    } else {
        return null
    }
}

/**
 * @name removeParentheses sql查询结果去括号
 * @params { @Array sql查询结果}
 * @return { @Array 处理后的结果}
 * @author HoChine.
 */

exports.removeParentheses = function (sqlArrData) {
    sqlArrData.forEach(function (item,index) {
        for (let key in item) {
            let reg = /\((.*)\,(\d+)\)/g;
            let exec = reg.exec(key);
            if(exec){
                let value = item[key];
                if(value.length >= (exec[2] -1) ){
                    value += '...';
                }
                item[exec[1]] = value;
                delete item[key]
            }
        }
    })
    return sqlArrData
}


