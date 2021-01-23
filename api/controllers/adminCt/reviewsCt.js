const Review = require('mongoose').model('Review')

const arrayReviews = [{
	_id: "jhgferrtt",
	name: "Harry",
	comment: "i am super happy about tpr, they take care me so gooood",
	picture: "www.pic.com",
	quand: Date.now()
	},{
	_id: "jhfdgdfgs",
	name: "Alice",
	comment: "i am super happy about tpr, they take care me so gooood",
	picture: "www.pic.com",
	quand: Date.now()
	},{
	_id: "jmnbvnb",
	name: "Borris",
	comment: "i am super happy about tpr, they take care me so gooood",
	picture: "www.pic.com",
	quand: Date.now()
}]

exports.getReviews = (req, res, next) => {
	// req to get all pics 
	// check if have car if yes hasCars = true
	console.log('grrrrrr')
	console.log(req.session)
	res.render('tprmain/reviews', {
		pageTitle: 'reviews',
		path: '/tprmain/reviews',
		reviews: arrayReviews,
		hasReview: true,
		editing: false
	})
}

exports.getAddReview = (req, res, next) => {
	// req to get all pics 
	console.log('ds getaddcar')
	console.log(req.session)
	res.render('tprmain/edit-review', {
		pageTitle: 'edit-review',
		path: '/edit-review',
		editing: false
	})
}

exports.getEditReview = (req, res, next) => {
	const ID = req.params.id 
	// req to get all pics 
	console.log('ds getEditcar')
	console.log('the IIIDDD: ', ID)
	
	const review = arrayReviews.filter(data => data._id.toString() === ID.toString())
	
	console.log('Thhe car: ', review)

	res.render('tprmain/edit-review', {
		pageTitle: 'edit-review',
		path: '/edit-review',
		editing: true,
		errorMessage: false,
		review: review[0]
	})
}

exports.postAddReview = (req, res, next) => {
	// req to get all pics 
	console.log('ds postaddcar')
	console.log(req.session)

	const nc = req.body
	const newReview = {
		_id: "jhgejhfds",
		name: nc.name,
		comment: nc.comment,
		picture: nc.picture,
		quand: Date.now()
	}
	// console.log(req.body)
	arrayReviews.push(newReview)
	console.log('car ADDDDD')
	console.log(arrayReviews)
	res.redirect('/admin/reviews')
}

exports.postEditReview = (req, res, next) => {
	// req to get all pics 
	console.log('ds postEditcar')
	console.log(req.session)
	console.log(req.body)
	
	const ID = req.params.id

	const nc = req.body
	const newReview = {
		_id: ID,
		name: nc.name,
		comment: nc.comment,
		picture: nc.picture,
		quand: Date.now()
	}
	
	const indexRepl = arrayReviews.findIndex(rv => rv._id === ID)
	arrayReviews[indexRepl] = newReview
	res.redirect('/admin/reviews')
}

exports.getDeleteReview = (req, res, next) => {
	console.log(req.params.id)
	const ID = req.params.id

	const indexToDelete = arrayReviews.findIndex(rv => rv._id === ID)
	arrayReviews.splice(indexToDelete, 1)
	res.redirect('/admin/reviews')
}

