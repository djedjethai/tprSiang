const { body, validationResult, check } = require('express-validator')
const { BadReqError } = require('../../error/listErrors')
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
			body('serie').trim().escape(),
			body('serieDetails').trim().escape(),
			body('wheel').trim().escape(),
			body('engine').trim().escape(),
			body('grade').trim().escape(),
			body('price').trim().escape(),
			body('color').trim().escape(),
			body('details').trim().escape(),
			// check(`${JSON.parse(Object.keys(try.body)[0]).style}`).not().isEmpty().trim().escape(),
			body('type').trim().escape(),
			body('bestSeller').trim().escape(),
		]
		, (req, res, next) => {
			console.log("the req: ", JSON.parse(Object.keys(req.body)[0]))
			let error = validationResult(req)
			console.log("thre err: ", error.errors)
			if(error.errors.length > 0) {
				logger.error(`${JSON.stringify(error.errors)}`)
				next(new BadReqError(`${error.errors[0].msg}`))
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
