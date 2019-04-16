/* 配置文件等敏感信息不能上传git, 请自行改名为config.js */

const database = {
    host: '127.0.0.1',
    port: 3306,
    database: 'koa2db',
    user: 'root',
    password: 'XXXXXXXX'
}


module.exports = {
    database: database
}