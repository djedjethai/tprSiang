const Picmain = require('mongoose').model('Picmain')

exports.getPicsmain = (req, res, next) => {
	// req to get all pics 
	console.log(req.session)
	res.render('tprmain/picsmain', {
		pageTitle: 'picsmain',
		path: '/picsmain',
		editing: false
	})
}
