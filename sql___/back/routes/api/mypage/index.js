const express = require('express')
const router = express.Router()
const keyRouter = require('./key-router')

router.use('/key', keyRouter)
// http://127.0.0.1:3000/api/mypage/key/7

module.exports = router