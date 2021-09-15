module.exports = (error, req, res, next) => {
	res.status(error.status).json({status: error.status, message: error.message})
}