const Car = require('mongoose').model('Car')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError } = require('../../error/listErrors')

const arrayCars = [{
	_id: "jhgferrtt",
	serie: "Fortuner",
	serieDetails:"cab prerunner",
	wheel:4,
	engine:"2.0 - 2.5 / hybrid",
	grade:"2.0 - 2.5 / hybrid",
	price:"M 3030344",
	color:"red",
	details:" kjhgkkhgfjhf jhgfjhgfjhgfjhgf jhgfjhgfjhgf jhgfjhgfjhgfjhgf jhgfjhgf jhgfjf",
	picture:"www.pic.com",
	style:"Seden",
	type:"รถยนฅ์นั่งส่วนบุคคล",
	bestSeller:'false'
	},{
	_id: "jhgfj9765",
	serie: "Fortuner",
	serieDetails:"cab prerunner",
	wheel:4,
	engine:"2.0 - 2.5 / hybrid",
	grade:"2.0 - 2.5 / hybrid",
	price:"M 3030344",
	color:"red",
	details:" kjhgkkhgfjhf jhgfjhgfjhgfjhgf jhgfjhgfjhgf jhgfjhgfjhgfjhgf jhgfjhgf jhgfjf",
	picture:"www.pic.com",
	style:"Suv",
	type:"รถยนฅ์นั่งส่วนบุคคล",
	bestSeller:'false'
	},{
	_id: "jhgerlkjhlkjhfds",
	serie: "Fortuner",
	serieDetails:"cab prerunner",
	wheel:4,
	engine:"2.0 - 2.5 / hybrid",
	grade:"2.0 - 2.5 / hybrid",
	price:"M 3030344",
	color:"red",
	details:" kjhgkkhgfjhf jhgfjhgfjhgfjhgf jhgfjhgfjhgf jhgfjhgfjhgfjhgf jhgfjhgf jhgfjf",
	picture:"www.pic.com",
	style:"Smart",
	type:"รถยนฅ์นั่งส่วนบุคคล",
	bestSeller:'false'
	}
]

exports.getCars = (req, res, next) => {
	// req to get all pics 
	res.render('tprmain/cars', {
		pageTitle: 'cars',
		path: '/tprmain/cars',
		cars: arrayCars,
		hasCars: true,
		editing: false
	})
}

exports.getAddCar = async (req, res, next) => {
	// req to get all pics 
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try {
		console.log('ds getaddcar')
		console.log(req.session)

		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) {
			throw(new ProcessError("A system error occured, please try again"))
			return
		}

		res.render('tprmain/edit-car', {
			pageTitle: 'edit-car',
			path: '/edit-car',
			editing: false,
			token: hash
		})
	} catch(e) {
		next(e)
	}		
}

exports.getEditCar = (req, res, next) => {
	const id = req.params.id 
	const car = arrayCars.filter(data => data._id.toString() === id.toString())

	res.render('tprmain/edit-car', {
		pageTitle: 'edit-car',
		path: '/edit-car',
		editing: true,
		errorMessage: false,
		car: car[0]
	})
}

exports.postAddCar = (req, res, next) => {
	const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
	const nc = JSON.parse(Object.keys(req.body)[0])
	
	if(nc.picUrl) {
		console.log(nc)
		const newCar = {
			_id: id,
			serie: nc.serie,
			serieDetails: nc.serieDetails,
			wheel: nc.wheel,
			engine: nc.engine,
			grade: nc.grade,
			price: nc.price,
			color: nc.color,
			details: nc.details,
			picture: nc.picUrl,
			style: nc.style,
			type: nc.type,
			bestSeller: nc.bestSeller.toString()
		}
		// console.log(req.body)
		arrayCars.push(newCar)
		console.log('car final datas stored: ', arrayCars)
		res.status(200).send({ok:"car saved"})
		return 
	}
	
	next(new ApiProcessError('A system error occured, please try again'))
}

exports.postEditCar = (req, res, next) => {
	// req to get all pics 
	console.log('ds postEditcar')
	console.log(req.session)
	console.log(req.body.bestSeller)
	
	const ID = req.params.id

	const nc = req.body
	console.log('to modif in ctroller', nc)
	const indexRepl = arrayCars.findIndex(car => car._id === ID)

	arrayCars[indexRepl].serie = nc.serie
	arrayCars[indexRepl].serieDetails = nc.serieDetails
	arrayCars[indexRepl].wheel = nc.wheel
	arrayCars[indexRepl].engine = nc.engine
	arrayCars[indexRepl].grade = nc.grade
	arrayCars[indexRepl].price = nc.price
	arrayCars[indexRepl].color = nc.color
	arrayCars[indexRepl].details = nc.details
	arrayCars[indexRepl].style = nc.style
	arrayCars[indexRepl].type = nc.type
	arrayCars[indexRepl].bestSeller = nc.bestSeller.toString()

	res.redirect('/admin/cars')
}

exports.getDeleteCar = (req, res, next) => {
	console.log(req.params.id)
	const ID = req.params.id

	const indexToDelete = arrayCars.findIndex(car => car._id === ID)
	arrayCars.splice(indexToDelete, 1)
	res.redirect('/admin/cars')
}
