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
	style:"single",
	type:"thai4",
	bestSeller:false
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
	style:"single",
	type:"ดดดด",
	bestSeller:false
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
	style:"single",
	type:"ดดดด",
	bestSeller:false
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
}

exports.postEditCar = (req, res, next) => {
	// req to get all pics 
	console.log('ds postEditcar')
	console.log(req.session)
}
