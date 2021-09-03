const path = require('path')
const express = require('express')
const router = express.Router()
const { error } = require('../../modules/util-module')
const { pool } = require('../../modules/mysql-module')




router.get('/join', (req, res, next) => {
	// 회원가입 폼을 보여준다. View
	// <form method="POST" action="/member/join">
	// <input name="userid">
	// <input name="userpw">
	// res.render()
})

router.post('/join', (req, res, next) => {
	// 회원가입 폼에서 submit되면 저장
	// req.body.userid 접근 가능
	// req.body.userpw 접근 가능
	// 데이터베이스 저장
	// res.redirect('/')
})

module.exports = router