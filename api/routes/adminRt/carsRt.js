const { validationResult, checkSchema } = require('express-validator')
const { BadReqError, ApiServerError } = require('../../error/listErrors')
const logger = require('../../services/logger')
const { getCars,
	getAddCar,
	getEditCar,
	getDeleteCar,
	postAddCar,
	postEditCar
} = require('../../controllers/adminCt/carsCt')
const isAuth = require('../../middleware/isAuth')
const isToken = require('../../middleware/isToken')


module.exports = app => {
	app.get('/cars', isAuth, getCars)
	app.get('/add-car', isAuth, getAddCar)
	app.get('/edit-car/:id', isAuth, getEditCar)
	app.get('/delete-car/:id', isAuth, getDeleteCar)	
	app.post('/add-car',
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
						} else if(input.type.toString() !== 'รถยนต์รุ่นพิเศษ'&&
							input.type.toString() !== 'รถยนต์นั่งส่วนบุคคล'&&
							input.type.toString() !== 'รถยนต์เพื่อการพาณิซย์'&&
							input.type.toString() !== 'รถยนต์อเนกประสงค์'
						){
							throw new Error('badInput')
						} else if(input.bestSeller.toString() !== 'false' &&
							input.bestSeller.toString() !== 'true'
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
				logger.error(`RouteValidator add-car: ${JSON.stringify(error.errors)}`)
				next(new BadReqError("Invalid input"))
			}
			next()
		},
		postAddCar
	)
	app.post('/edit-car/:id', 
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
						} else if(input.type.toString() !== 'รถยนต์รุ่นพิเศษ' &&
							input.type.toString() !== 'รถยนต์นั่งส่วนบุคคล'&&
							input.type.toString() !== 'รถยนต์เพื่อการพาณิซย์'&&
							input.type.toString() !== 'รถยนต์อเนกประสงค์'
						){
							throw new Error('badInput')
						} else if(input.bestSeller.toString() !== 'false' &&
							input.bestSeller.toString() !== 'true'
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
				logger.error(`RouteValidator edit-car: ${JSON.stringify(error.errors)}`)
				next(new BadReqError("Invalid Input"))
			}
			next()
		},
		postEditCar
	)
}
