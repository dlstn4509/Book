const express = require('express')
const router = express.Router()

const viewRouter = require('./view-router')
const downloadRouter = require('./download-router')
const listRouter = require('./list-router')

router.use('/view', viewRouter)									// HTML/GET: 상세페이지
router.use('/download', downloadRouter)					// HTML/GET: 상세페이지
router.use('/', listRouter)											// HTML/GET: 리스트페이지

module.exports = router
