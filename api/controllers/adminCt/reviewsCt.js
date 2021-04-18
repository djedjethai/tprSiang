const Review = require('mongoose').model('Review')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError } = require('../../error/listErrors')

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
	res.render('tprmain/reviews', {
		pageTitle: 'reviews',
		path: '/tprmain/reviews',
		reviews: arrayReviews,
		hasReview: true,
		editing: false
	})
}

exports.getAddReview = async(req, res, next) => {
	// req to get all pics 
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try {
		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) {
			throw(new ProcessError("A system error occured, please try again"))
			return
		}

		res.render('tprmain/edit-review', {
			pageTitle: 'edit-review',
			path: '/edit-review',
			editing: false,
			token: hash
		})
	} catch(e) {
		next(e)
	}	
}

exports.getEditReview = (req, res, next) => {
	// req to get all pics 
	const ID = req.params.id 
	const review = arrayReviews.filter(data => data._id.toString() === ID.toString())

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
	const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
	const nc = JSON.parse(Object.keys(req.body)[0])

	if(nc.picUrl) {
		const newReview = {
			_id: id,
			name: nc.name,
			comment: nc.comment,
			picture: nc.picUrl,
			quand: Date.now()
		}
		// console.log(req.body)
		arrayReviews.push(newReview)
		res.status(200).send({ok:"review saved"})
		return 
	} 

	next(new ApiProcessError('A system error occured, please try again'))
}

exports.postEditReview = (req, res, next) => {
	// req to get all pics 
	const ID = req.params.id

	const indexRepl = arrayReviews.findIndex(rv => rv._id === ID)
	const nc = req.body
	arrayReviews[indexRepl].name = nc.name
	arrayReviews[indexRepl].comment = nc.comment	
	arrayReviews[indexRepl].quand = Date.now()
	
	res.redirect('/admin/reviews')
}

exports.getDeleteReview = (req, res, next) => {
	console.log(req.params.id)
	const ID = req.params.id

	const indexToDelete = arrayReviews.findIndex(rv => rv._id === ID)
	arrayReviews.splice(indexToDelete, 1)
	res.redirect('/admin/reviews')
}

