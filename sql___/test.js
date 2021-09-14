const express = require('express')
const app = express()
const host = '127.0.0.1'
const port = 3000

app.get('/', (req, res, next) => {
	let name = req.query.name
	res.send(`dddddddd, ${name || '업승'}`)
})

app.listen(port, () => {console.log('http://127.0.0.1:3000')})



document.querySelector('#아이디').addEventListener('click', () => {
	
})