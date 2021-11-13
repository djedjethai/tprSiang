const { validationResult, checkSchema } = require('express-validator')
const { BadReqError, ApiServerError } = require('../../error/listErrors')
const logger = require('../../services/logger')
const { 
	getPicsstyle,
	getDeletePicsstyle,
	getChoicePicsstyle,
	postAddPicsstyle,
	getModifyPicsstyle,
	postModifyPicsstyle
} = require('../../controllers/adminCt/picsstyleCt')
const isAuth = require('../../middleware/isAuth')
const isToken = require('../../middleware/isToken')

module.exports = app => {
	app.get('/picsstyle', isAuth, getPicsstyle)
	app.get('/delete-picsstyle/:id', isAuth, getDeletePicsstyle)
	app.get('/choice-picsstyle', isAuth, getChoicePicsstyle)
	app.get('/modify-picsstyle/:id', isAuth, getModifyPicsstyle)

	app.post('/add-picsstyle', 
		isToken,
		[
			checkSchema({
      				myCustomField: {
				// custom validator
      				custom: {
      				  	options: (value, { req }) => {
						const input = JSON.parse(Object.keys(req.body)[0])
						if(input.style.toString() !== 'Sedan' && 
							input.style.toString() !== 'SUV' &&
							input.style.toString() !== 'Standard-cab' &&
							input.style.toString() !== 'Smart-cab' &&
							input.style.toString() !== 'Double-cab'
						){
							throw new Error('badInput')
						} else if(input.picUrl === ''){
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
				logger.error(`RouteValidator add-picsstyle: ${JSON.stringify(error.errors)}`)
				next(new BadReqError("Invalid input"))
			}
			next()
		},
		postAddPicsstyle
	)
	app.post('/modify-picsstyle/:id', 
		isAuth,
		[
			checkSchema({
      				myCustomField: {
				// custom validator
      				custom: {
      				  	options: (value, { req }) => {
						const input = req.body
						if(input.style.toString() !== 'Sedan' && 	
							input.style.toString() !== 'SUV' &&
							input.style.toString() !== 'Standard-cab' &&
							input.style.toString() !== 'Smart-cab' &&
							input.style.toString() !== 'Double-cab'
						){
							throw new Error('badInput')
						} else if(input.picUrl === ''){
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
				logger.error(`RouteValidator add-picsstyle: ${JSON.stringify(error.errors)}`)
				next(new BadReqError("Invalid input"))
			}
			next()
		},
		postModifyPicsstyle
	)
}
