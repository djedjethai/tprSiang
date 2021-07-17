const Review = require('mongoose').model('Review')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError, ServerError } = require('../../error/listErrors')
const deleteHandler = require('../../services/deletePic')
const { reviewDelCache } = require('../../services/cache')

const REVIEW_CT = 'reviewCT'

// get all reviews 
exports.getReviews = async(req, res, next) => {
	try{
		const reviewsDB = await Review.find()

		res.render('tprmain/reviews', {
			pageTitle: 'reviews',
			path: '/tprmain/reviews',
			reviews: reviewsDB,
			hasReview: true,
			editing: false
		})
	} catch(e) {
		next(new ServerError('A network error occured please try again'))
	}
}

// get token for auth before saving-picture's ajax request  
exports.getAddReview = async(req, res, next) => {
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try {
		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) throw Error(REVIEW_CT,' - token is not save')

		res.render('tprmain/edit-review', {
			pageTitle: 'edit-review',
			path: '/edit-review',
			editing: false,
			token: hash
		})
	} catch(e) {
		next(new ProcessError('A system error occured, please try again'))
	}	
}

// req review's datas for editing 
exports.getEditReview = async(req, res, next) => {
	try{
		const ID = req.params.id 
		const reviewToEdit = await Review.findById(ID)

		res.render('tprmain/edit-review', {
			pageTitle: 'edit-review',
			path: '/edit-review',
			editing: true,
			errorMessage: false,
			review: reviewToEdit
		})
	} catch(e) {	
		next(new ServerError('A network error occured please try again'))
	}	
}

// add review to db
exports.postAddReview = async(req, res, next) => { 
	try{
		const nc = JSON.parse(Object.keys(req.body)[0])

		if(nc.picUrl) {
			const newReview = new Review({
				name: nc.name,
				comment: nc.comment,
				pic: nc.picUrl,
				quand: Date.now()
			})
			await newReview.save()

			reviewDelCache()

			res.status(200).send({ok:"review saved"})
			return 
		}
		else throw Error(REVIEW_CT,' - picture url is missing')	
	} catch(e) {
		next(new ApiProcessError('A system error occured, please try again'))
	}
}

// datas to update selected review
exports.postEditReview = async(req, res, next) => {
	try{
		const ID = req.params.id
		const reviewToEdit = await Review.findById(ID)

		const nc = req.body
		reviewToEdit.name = nc.name
		reviewToEdit.comment = nc.comment	
		reviewToEdit.quand = Date.now()
		
		await reviewToEdit.save()
		
		reviewDelCache()

		res.redirect('/admin/reviews')
	} catch(e) {
		next(new ServerError('A network error occured please try again'))
	}
}

exports.getDeleteReview = async(req, res, next) => {
	try{
		const ID = req.params.id
		const reviewDeleted = await Review.findOneAndDelete({_id:ID})
		
		const urlArr = reviewDeleted.pic.split('/')
		// delete pic in s3 bucket
		const d = await deleteHandler(urlArr)
		if(!d) throw Error(REVIEW_CT,' - deleting s3 has a problem')
	
		reviewDelCache()

		res.redirect('/admin/reviews')
	} catch(e) {
		next(new ProcessError('A system error occured during deleting the picture'))
	}
}


