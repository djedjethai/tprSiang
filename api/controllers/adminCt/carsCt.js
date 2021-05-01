const Car = require('mongoose').model('Car')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError, ServerError } = require('../../error/listErrors')
const deleteHandler = require('../../services/deletePic')

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
		next(new ProcessError('A system error occured, please try again'))
	}
}

// add a car
exports.postAddCar = async(req, res, next) => {
	try{
		const nc = JSON.parse(Object.keys(req.body)[0])
		
		if(nc.picUrl) {
			const newCar = new Car({
				serie: nc.serie,
				serieDetails: nc.serieDetails,
				wheel: nc.wheel,
				engine: nc.engine,
				grade: nc.grade,
				price: nc.price,
				color: nc.color,
				details: nc.details,
				pic: nc.picUrl,
				style: nc.style,
				type: nc.type,
				bestSeller: nc.bestSeller.toString()
			})
			await newCar.save()
			
			res.status(200).send({ok:"car saved"})
			return 
		}
		else throw Error(CAR_CT,' - picture url is missing')
	} catch(e) {
		next(new ApiProcessError('A system error occured, please try again'))
	}
}

// save datas about the modifyied car 
exports.postEditCar = async(req, res, next) => {
	try{
		const ID = req.params.id
		const nc = req.body
		const carToModify = await Car.findById(ID)

		carToModify.serie = nc.serie
		carToModify.serieDetails = nc.serieDetails
		carToModify.wheel = nc.wheel
		carToModify.engine = nc.engine
		carToModify.grade = nc.grade
		carToModify.price = nc.price
		carToModify.color = nc.color
		carToModify.details = nc.details
		carToModify.style = nc.style
		carToModify.type = nc.type
		carToModify.bestSeller = nc.bestSeller.toString()
		
		await carToModify.save()

		res.redirect('/admin/cars')
	} catch(e) {
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

		res.redirect('/admin/cars')
	} catch(e) {
		next(new ProcessError('A system error occured during deleting the picture'))
	}
}
