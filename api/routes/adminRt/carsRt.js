const { body, validationResult, checkSchema } = require('express-validator')
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
						console.log(input.style.toString())

						if(input.style.toString() !== 'Pick-up' ||
							input.style !== 'Sedan' ||
							input.style !== 'Suv' ||
							input.style !== 'Smart' ||
							input.style !== 'Double'
						){
							console.log('q')
							throw new Error('badInput')
						} else if(input.type !== 'รุนรถ' ||
							input.type !== 'รถยนฅ์นั่งส่วนบุคคล' ||
							input.type !== 'รถยนฅ์เพื่อการพาณิซย์' ||
							input.type !== 'รถยนฅ์อเนกประสงค์'
						){
							console.log('w')
							throw new Error('badInput')
						} else if(input.bestSeller !== false ||
							input.bestSeller !== true
						){	
							console.log('e')
							throw new Error('badInput')
						} else if(input.picUrl === ''){
							console.log('r')
							throw new Error('badInput')
						} else if(input.token === ''){
							console.log('t')
							throw new Error('badInput')
						} 
						// for testing
						// else if(input.wheel === ''){
						// 	throw new Error('badInput')
						// }

      				  	},
      					},
					// customSanitizer:{
					// 	// pb here
					// 	options: (value, { req }) => {
					// 		const input = JSON.parse(Object.keys(req.body)[0])
					// 		// add logic to sanitize all fields
					// 		// example
					// 		// let sanitizedValue;
          				// 		// if (typeof(input.serie) !== 'string') {
          				// 		//   	sanitizedValue = input.serie.trim()
          				// 		// } else {
          				// 		//   sanitizedValue = '';
          				// 		// }
					// 		let sanitizedValue = ''
          				// 		return sanitizedValue;
					// 	}
					// }
				}
			})
		]
		, (req, res, next) => {
			let error = validationResult(req)
			console.log("thre err: ", error.errors[0].msg)
			if(error.errors[0].msg === "badInput") {
				next(new BadReqError("donnnne"))
			}
			next()
		},
		postAddCar
	)
	app.post('/edit-car/:id', 
		isAuth,
		[
			body('serie').trim().escape(),
			body('serieDetails').trim().escape(),
			body('wheel').trim().escape(),
			body('engine').trim().escape(),
			body('grade').trim().escape(),
			body('price').trim().escape(),
			body('color').trim().escape(),
			body('details').trim().escape(),
			body('style').not().isEmpty().trim().escape(),
			body('type').not().isEmpty().trim().escape(),
			body('bestSeller').not().isEmpty().trim().escape(),
		], (req, res, next) => {
			let error = validationResult(req)
			if(error.errors.length > 0) {
				logger.error(`${JSON.stringify(error.errors)}`)
				next(new BadReqError(`${error.errors[0].msg}`))
			}
			next()
		},
		postEditCar
	)
}
