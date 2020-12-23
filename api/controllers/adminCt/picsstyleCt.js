exports.getPicsstyle = (req, res, next) => {
	// query the pics style
	console.log(req.session)
	res.render('tprmain/picsstyle', {
		pageTitle: 'picsstyle',
		path: '/picsstyle',
		editing: false
	})	
}
