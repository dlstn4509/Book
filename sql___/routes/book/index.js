const express = require('express')
const router = express.Router()

const formRouter = require('./form-router')
const saveRouter = require('./save-router')
const listRouter = require('./list-router')
const viewRouter = require('./view-router')
const downloadRouter = require('./download-router')
const deleteRouter = require('./delete-router')
// const updateRouter = require('./update-router')


router.post('/', saveRouter)             // POST: 저장
router.delete('/', deleteRouter)           // DELETE: 삭제
router.use('/form', formRouter)            // HTML: 글작성 or 수정 페이지
router.use('/view', viewRouter)            // HTML/GET: 상세페이지
router.use('/download', downloadRouter)    // GET: 첨부파일 다운로드
router.use('/', listRouter)
                                           // HTML/GET: 리스트


module.exports = router

/* 
POST       /book                저장 save
PUT        /book                업데이트 update
DELETE     /book                삭제 delete
GET        /book/form           신규 CREATE
GET        /book/form/1         수정 UPDATE
GET        /book/view/1         상세리스트 VIEW
GET        /book/download/1     파일 다운
GET        /book, /book/:page   페이지리스트 LIST - page 
*/