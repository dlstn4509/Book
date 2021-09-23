const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util')
const { pool } = require('../../modules/mysql-init')

const formRouter = require('./form-router')
const loginRouter = require('./login-router')
const logoutRouter = require('./logout-router')

router.use('/form', formRouter)
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)

module.exports = router