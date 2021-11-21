const path = require('path')
const express = require('express')
const router = express.Router()
const {  } = require('../../modules/util')
const {  } = require('../../models/auth')

const userRouter = require('./user-router')

router.use('/user', userRouter)

module.exports = router