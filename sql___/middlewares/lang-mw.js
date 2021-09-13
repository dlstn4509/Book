module.exports =  (req, res, next) => {
	const langs = ['ko', 'en']
	const urls = req.url.split('/')
	if(urls[1] && langs.includes(urls[1])) {
		var [lang] = urls.splice(1, 1)
		req.url = urls.join('/')
	}
	req.lang = require('../modules/lang-init')(lang || 'ko')
	req.app.locals = {...req.app.locals, ...req.lang, LANG: lang || 'ko'}
	next()
}
