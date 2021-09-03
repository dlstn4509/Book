module.exports = (app, port) => {
	app.listen(port, () => {
		console.log("===================")
		console.log('Server Running !!!!')
		console.log('127.0.0.1:'+port)
		console.log("===================")
	})
}

