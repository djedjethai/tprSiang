const { getReviews,
	getAddReview,
	getEditReview,
	getDeleteReview,
	postAddReview,
	postEditReview
} = require('../../controllers/adminCt/reviewsCt')
const isAuth = require('../../middleware/isAuth')
const isToken = require('../../middleware/isToken')

module.exports = app => {
	app.get('/reviews', isAuth, getReviews)
	app.get('/add-review', isAuth, getAddReview)
	app.get('/edit-review/:id', isAuth, getEditReview)
	app.get('/delete-review/:id', isAuth, getDeleteReview)
	
	app.post('/add-review', isToken, postAddReview)
	app.post('/edit-review/:id', isAuth, postEditReview)
}








