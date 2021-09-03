require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()

require('./modules/server-init')(app, process.env.PORT)

const memberRouter = require('./routers/member')
app.use('/member', memberRouter)