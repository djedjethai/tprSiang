exports.getCars = (req, res, next) => {
	// req to get all pics 
	console.log('grrrrrr')
	console.log(req.session)
	res.render('tprmain/cars', {
		pageTitle: 'cars',
		path: '/cars',
		editing: false
	})
}
