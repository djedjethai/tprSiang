const { validationResult, checkSchema } = require('express-validator')
const { BadReqError, ApiServerError } = require('../../error/listErrors')
const logger = require('../../services/logger')
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
	
	app.post('/add-review', 
		isToken, 
		[
			checkSchema({
      				myCustomField: {
				// custom validator
      				custom: {
      				  	options: (value, { req }) => {
						const input = JSON.parse(Object.keys(req.body)[0])
						if(input.picUrl === ''){
							throw new Error('badInput')
						} else if(input.token === ''){
							throw new Error('badInput')
						} 

      				  	},
      				},					}
			})
		]
		, (req, res, next) => {
			let error = validationResult(req)
			if(error.errors[0].msg === "badInput") {
				logger.error(`RouteValidator add-review: ${JSON.stringify(error.errors)}`)
				next(new BadReqError("Invalid input"))
			}
			next()
		},
		postAddReview
	)
	app.post('/edit-review/:id', 
		isAuth,
		[
			checkSchema({
      				myCustomField: {
				// custom validator
      				custom: {
      				  	options: (value, { req }) => {
						const input = req.body
						if(input.picUrl === ''){
							throw new Error('badInput')
						} else if(input.token === ''){
							throw new Error('badInput')
						} 

      				  	},
      				},					}
			})
		]
		, (req, res, next) => {
			let error = validationResult(req)
			if(error.errors[0].msg === "badInput") {
				logger.error(`RouteValidator edit-review: ${JSON.stringify(error.errors)}`)
				next(new BadReqError("Invalid input"))
			}
			next()
		},

		postEditReview
	)
}
