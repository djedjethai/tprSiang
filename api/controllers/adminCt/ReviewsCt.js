exports.getReviews = (req, res, next) => {
	// query reviews
	
	res.render('tprmain/reviews', {
		pageTitle: 'reviews',
		path: '/reviews',
		editing: false
	})
}
