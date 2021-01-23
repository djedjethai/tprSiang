const { getReviews,
	getAddReview,
	getEditReview,
	getDeleteReview,
	postAddReview,
	postEditReview
} = require('../../controllers/adminCt/reviewsCt.jsCt')
const isAuth = require('../../middleware/isAuth')

module.exports = app => {
	app.get('/cars', isAuth, getCars)
	app.get('/add-car', getAddCar)
	app.get('/edit-car/:id', getEditCar)
	app.get('/delete-car/:id', getDeleteCar)
	
	app.post('/add-car', postAddCar)
	app.post('/edit-car/:id', postEditCar)
}







const { getReviews } = require('../../controllers/adminCt/ReviewsCt')

module.exports = app => {
	app.get('/reviews', getReviews)
}
