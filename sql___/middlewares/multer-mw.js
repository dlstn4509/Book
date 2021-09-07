// https://github.com/expressjs/multer/blob/master/doc/README-ko.md
const multer = require('multer')
const moment = require('moment')
const path = require('path')
const fs = require('fs-extra') // 파일 시스템
const {v4 : uuid} = require('uuid')
const { uniqueId } = require('lodash')
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

const filename = async (req, file, cb) => {  // 파일 이름
		const ext = path.extname(file.originalname).toLowerCase()     // 확장자 (.jpg)
		// const ext = file.originalname.split('.').pop()   // 확장자 (jpg)
		const filename = moment().format('YYMMDD') + '_' + uuid() + ext // getTime + 확장자
		cb(null, filename)
}

const storage = multer.diskStorage({destination,filename}) // 폴더 + 파일

const limits = {fileSSize : mega * 5} // 용량 제한

module.exports = multer({ storage, limits }) // 최종 업로드