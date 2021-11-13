const { validationResult, checkSchema } = require('express-validator')
const { BadReqError, ApiServerError } = require('../../error/listErrors')
const logger = require('../../services/logger')
const { getPicsmain, 
	getDeletePicsmain,
	getChoicePicsmain,
	postAddPicsmain 
} = require('../../controllers/adminCt/picsmainCt')
const isAuth = require('../../middleware/isAuth')
const isToken = require('../../middleware/isToken')

module.exports = app => {
	app.get('/picsmain', isAuth, getPicsmain)
	app.get('/delete-picsmain/:id', isAuth, getDeletePicsmain)
	app.get('/choice-picsmain', isAuth, getChoicePicsmain)

	app.post('/add-picsmain', 
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
				logger.error(`RouteValidator add-picsMain: ${JSON.stringify(error.errors)}`)
				next(new BadReqError("Invalid input"))
			}
			next()
		},
		postAddPicsmain
	)
}


