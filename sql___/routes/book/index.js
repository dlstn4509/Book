const express = require('express')
const router = express.Router()

const formRouter = require('./form-router')
const saveRouter = require('./save-router')
const listRouter = require('./list-router')
const viewRouter = require('./view-router')

router.use('/form', formRouter) // HTML: 글작성 페이지
router.use('/save', saveRouter) // POST: 저장
router.use('/list', listRouter) // HTML/GET: 리스트
router.use('/view', viewRouter) // HTML/GET: 상세페이지

module.exports = router