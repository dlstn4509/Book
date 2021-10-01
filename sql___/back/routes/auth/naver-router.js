const path = require('path')
const express = require('express')
const router = express.Router()
const passport = require('passport')
const { error } = require('../../modules/util')

router.get('/', passport.authenticate('naver'))

router.get('/cb', passport.authenticate('naver', {failureRedirect: '/'}), (req, res, next) => {
	res.redirect('/')
})

module.exports = router