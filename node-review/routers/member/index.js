const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util-module')
const { pool } = require('../../modules/mysql-module')

const joinRouter = require('./join-router')
router.use('/join', joinRouter)

module.exports = router