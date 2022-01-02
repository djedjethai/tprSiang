const Car = require('mongoose').model('Car')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError, ServerError } = require('../../error/listErrors')
const deleteHandler = require('../../services/deletePic')
const logger = require('../../services/logger')

const { carDelCache} = require('../../services/cache')

const CAR_CT = 'carsCt'


// req to get all pics 
exports.getCars = async(req, res, next) => {
	try{
		const carsList = await Car.find()
		
		res.render('tprmain/cars', {
			pageTitle: 'cars',
			path: '/tprmain/cars',
			cars: carsList,
			hasCars: true,
			editing: false
		})
	} catch(e) {
		logger.error(`adminCt carsCt getCars: ${e}`)
		next(new ServerError('A network error occured please try again'))
	}
}

// get token before to add pic to s3
exports.getAddCar = async (req, res, next) => {
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try {
		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) throw Error(CAR_CT,' - token is not save')

		res.render('tprmain/edit-car', {
			pageTitle: 'edit-car',
			path: '/edit-car',
			editing: false,
			token: hash
		})
	} catch(e) {
		logger.error(`adminCt carsCt getAddCars: ${e}`)
		next(new ProcessError('A system error occured, please try again'))
	}		
}

// get datas about the car to modify
exports.getEditCar = async(req, res, next) => {
	try{
		const id = req.params.id 
		const carToEdit = await Car.findById(id)

		res.render('tprmain/edit-car', {
			pageTitle: 'edit-car',
			path: '/edit-car',
			editing: true,
			errorMessage: false,
			car: carToEdit
		})
	} catch(e) {
		logger.error(`adminCt carsCt getEditCar: ${e}`)
		next(new ProcessError('A system error occured, please try again'))
	}
}

// add a car
exports.postAddCar = async(req, res, next) => {
	try{
		const nc = JSON.parse(Object.keys(req.body)[0])
		
		if(nc.picUrl) {
			const newCar = new Car({
				serie: nc.serie.toString(),
				serieDetails: nc.serieDetails.toString(),
				wheel: nc.wheel.toString(),
				engine: nc.engine.toString(),
				grade: nc.grade.toString(),
				price: nc.price.toString(),
				color: nc.color.toString(),
				details: nc.details.toString(),
				pic: nc.picUrl.toString(),
				style: nc.style.toString(),
				type: nc.type.toString(),
				bestSeller: nc.bestSeller.toString()
			})
			await newCar.save()

			carDelCache(nc.type, nc.style)
			
			res.status(200).send({ok:"car saved"})
			return 
		}
		else throw Error(CAR_CT,' - picture url is missing')
	} catch(e) {
		logger.error(`adminCt carsCt postAddCar: ${e}`)
		next(new ApiProcessError('A system error occured, please try again'))
	}
}

// save datas about the modifyied car 
exports.postEditCar = async(req, res, next) => {
	try{
		const ID = req.params.id
		const nc = req.body

		const carToModify = await Car.findById(ID)

		carToModify.serie = nc.serie.toString()
		carToModify.serieDetails = nc.serieDetails.toString()
		carToModify.wheel = nc.wheel.toString()
		carToModify.engine = nc.engine.toString()
		carToModify.grade = nc.grade.toString()
		carToModify.price = nc.price.toString()
		carToModify.color = nc.color.toString()
		carToModify.details = nc.details.toString()
		carToModify.style = nc.style.toString()
		carToModify.type = nc.type.toString()
		carToModify.bestSeller = nc.bestSeller.toString()
		
		await carToModify.save()

		// console.log('car del cache id', ID)
		carDelCache(carToModify.type, carToModify.style, ID)

		res.redirect('/admin/cars')
	} catch(e) {
		logger.error(`adminCt carsCt postEditCar: ${e}`)
		next(new ServerError('A network error occured please try again'))
	}
}

exports.getDeleteCar = async(req, res, next) => {
	try{
		const ID = req.params.id
		const carToDelete = await Car.findOneAndDelete({_id:ID})
		const urlArr = carToDelete.pic.split('/')
		// delete pic in s3 bucket
		const d = await deleteHandler(urlArr)
		if(!d) throw Error(CAR_CT,' - deleting s3 has a problem')

		carDelCache(carToDelete.type, carToDelete.style, ID)

		res.redirect('/admin/cars')
	} catch(e) {
		logger.error(`adminCt carsCt getDeleteCar: ${e}`)
		next(new ProcessError('A system error occured during deleting the picture'))
	}
}
