const { getReviews,
	getAddReview,
	getEditReview,
	getDeleteReview,
	postAddReview,
	postEditReview
} = require('../../controllers/adminCt/reviewsCt.js')
const isAuth = require('../../middleware/isAuth')

module.exports = app => {
	app.get('/reviews', isAuth, getReviews)
	app.get('/add-review', getAddReview)
	app.get('/edit-review/:id', getEditReview)
	app.get('/delete-review/:id', getDeleteReview)
	
	app.post('/add-review', postAddReview)
	app.post('/edit-review/:id', postEditReview)
}

