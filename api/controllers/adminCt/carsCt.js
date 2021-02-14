const Car = require('mongoose').model('Car')


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
	// check if have car if yes hasCars = true
	console.log('grrrrrr')
	console.log(req.session)
	res.render('tprmain/cars', {
		pageTitle: 'cars',
		path: '/tprmain/cars',
		cars: arrayCars,
		hasCars: true,
		editing: false
	})
}

exports.getAddCar = (req, res, next) => {
	// req to get all pics 
	console.log('ds getaddcar')
	console.log(req.session)
	res.render('tprmain/edit-car', {
		pageTitle: 'edit-car',
		path: '/edit-car',
		editing: false
	})
}

exports.getEditCar = (req, res, next) => {
	const id = req.params.id 
	// req to get all pics 
	console.log('ds getEditcar')
	console.log('the IIIDDD: ', id)
	
	const car = arrayCars.filter(data => data._id.toString() === id.toString())
	
	console.log('Thhe car: ', car)

	res.render('tprmain/edit-car', {
		pageTitle: 'edit-car',
		path: '/edit-car',
		editing: true,
		errorMessage: false,
		car: car[0]
	})
}

exports.postAddCar = (req, res, next) => {
	// req to get all pics 
	console.log('ds postaddcar')
	console.log(req.session)

	const id = Math.random().toString(36).split('.')[1].slice(0, 4)	

	const nc = req.body
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
		picture: nc.picture,
		style: nc.style,
		type: nc.type,
		bestSeller: nc.bestSeller
	}
	// console.log(req.body)
	arrayCars.push(newCar)
	console.log('car ADDDDD')
	console.log(arrayCars)
	res.redirect('/admin/cars')
}

exports.postEditCar = (req, res, next) => {
	// req to get all pics 
	console.log('ds postEditcar')
	console.log(req.session)
	console.log(req.body.bestSeller)
	
	const ID = req.params.id

	const nc = req.body
	const newCar = {
		_id: ID,
		serie: nc.serie,
		serieDetails: nc.serieDetails,
		wheel: nc.wheel,
		engine: nc.engine,
		grade: nc.grade,
		price: nc.price,
		color: nc.color,
		details: nc.details,
		picture: nc.picture,
		style: nc.style,
		type: nc.type,
		bestSeller: nc.bestSeller
	}
	
	const indexRepl = arrayCars.findIndex(car => car._id === ID)
	arrayCars[indexRepl] = newCar
	res.redirect('/admin/cars')
}

exports.getDeleteCar = (req, res, next) => {
	// console.log('dddddddddddeeeeeeeeeellllllllleeeeeeeettte')
	console.log(req.params.id)
	const ID = req.params.id

	const indexToDelete = arrayCars.findIndex(car => car._id === ID)
	arrayCars.splice(indexToDelete, 1)
	res.redirect('/admin/cars')
}
