// https://github.com/expressjs/multer/blob/master/doc/README-ko.md
const multer = require('multer')
const moment = require('moment')
const path = require('path')
const fs = require('fs-extra')
const { v4: uuid } = require('uuid')
const { exts } = require('../modules/util')
const allowExt = [...exts.imgExt, ...exts.docExt, ...exts.mediaExt, ...exts.zipExt]
const mega = 1024000

const destination = async (req, file, cb) => {  // 폴더명
	try {
		const folder = path.join(__dirname, '../storages/', moment().format('YYMMDD'))
		await fs.ensureDir(folder)
		cb(null, folder)
	}
	catch(err) {
		cb(err)
	}
}	

const filename = (req, file, cb) => {  // 파일 이름
	try {
		const ext = path.extname(file.originalname).toLowerCase()     // 확장자 (.jpg)
		// const ext = file.originalname.split('.').pop()   // 확장자 (jpg)
		const filename = moment().format('YYMMDD') + '_' + uuid() + ext // getTime + 확장자
		cb(null, filename)
	}
	catch(err) {
		cb(err)
	}
}

const fileFilter = (req, file, cb) => { // 파일 점검
	try {
		const ext = path.extname(file.originalname).substr(1).toLowerCase()
		if(allowExt.includes(ext)) cb(null, true)
		else cb(new Error(`첨부하신 파일은 업로드가 허용되지 않습니다 - ${ext}파일`))
	}
	catch(err) {
		cb(err)
	}
}


const storage = multer.diskStorage({destination,filename}) // 폴더 + 파일
const limits = {fileSSize : mega * 5} // 용량 제한

module.exports = multer({ storage, limits, fileFilter })


