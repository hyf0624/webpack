/**
 * 服务器代码
 * 启动命令： node server.js
 */
const express = require('express')
const app = express()
app.use(express.static('build', { maxAge: 1000 * 3600 }))
