const app = require('../../../index')
const session = require('supertest-session')
const keys = require('../../../config/keys')
const Car = require('mongoose').model('Car')

//  test get cars
it('makes sure getCars need authentification', async() => {
	await session(app)
		.get('/cars')
		.send()
		.expect('Location', '/admin/getsignin')

})

it('get all the cars', async() => {
	const resp = await global.signin()
	
	await resp
		.get('/cars')
		.send()
		.expect(200)
})

// test postAddCars, all token logic is tested separatly
it('add some correct cars', async() => {
	
	const dataSample = new Car({
		serie:'serie',
		serieDetails:'serieDetails',
		wheel: 4,
		engine:'engine',
		grade:'grade',
		price:'12345.45',
		color:'color',
		details:'details',
		pic:'http://urlPicture.com',
		style:'style',
		type:'string',
		bestSeller:'1'
	})
	const savedDts = await dataSample.save()

	const carsDB = await Car.find()

	expect(dataSample.serie).toEqual(carsDB[0].serie)
	expect(dataSample.serieDetails).toEqual(carsDB[0].serieDetails)	
	expect(dataSample.wheel).toEqual(carsDB[0].wheel)	
	expect(dataSample.engine).toEqual(carsDB[0].engine)
	expect(dataSample.grade).toEqual(carsDB[0].grade)
	expect(dataSample.price).toEqual(carsDB[0].price)
	expect(dataSample.color).toEqual(carsDB[0].color)
	expect(dataSample.details).toEqual(carsDB[0].details)
	expect(dataSample.pic).toEqual(carsDB[0].pic)
	expect(dataSample.style).toEqual(carsDB[0].style)
	expect(dataSample.type).toEqual(carsDB[0].type)
	expect(dataSample.bestSeller).toEqual(carsDB[0].bestSeller)

})


// test postEditCars
it('makes sure postEditCars need authentification', async() => {
	await session(app)
		.get('/edit-car/:id')
		.send()
		.expect('Location', '/admin/getsignin')
})

it('update a car', async() => {
	const resp = await global.signin()

	// save/set original review
	const dataSample = new Car({
		serie:'serie',
		serieDetails:'serieDetails',
		wheel: 4,
		engine:'engine',
		grade:'grade',
		price:'12345',
		color:'color',
		details:'details',
		pic:'http://urlCanNotUpdate',
		style:'style',
		type:'string',
		bestSeller:'true'
	})

	const carSaved = await dataSample.save()

	// create updated review
	const updatedDatas = {
		serie: 'changeeed againnn hhhh',
		serieDetails: 'bcvcxbv hjhgjh hhh',
		wheel: 8,
 		engine: 'fghgfhg hghhhgh yyyy',
		grade: 'fghghg hjjjhjhhg yyyy',
		price: '111111111',
		color: 'vbncbn  hhjhjhjjv hhhh',
		details: ' ryrstyrtyrty  ghjhjfjg  hhh',
		pic:'http://urlCanNotUpdate',
		style: 'Double',
		type: 'รุนรถ',
		bestSeller: 'true'
	}

	// save updated datas
	const encule = await resp
		.post(`/edit-car/${carSaved._id}`)
		.set('Content-Type','application/x-www-form-urlencoded')
		.send(updatedDatas)
		.expect(302)

	// get the reviews
	const carsDB = await Car.find()	

	expect(updatedDatas.serie).toEqual(carsDB[0].serie)
	expect(updatedDatas.serieDetails).toEqual(carsDB[0].serieDetails)
	expect(updatedDatas.wheel).toEqual(carsDB[0].wheel)
	expect(updatedDatas.engine).toEqual(carsDB[0].engine)
	expect(updatedDatas.grade).toEqual(carsDB[0].grade)
	expect(updatedDatas.price).toEqual(carsDB[0].price)
	expect(updatedDatas.color).toEqual(carsDB[0].color)
	expect(updatedDatas.details).toEqual(carsDB[0].details)
	expect(updatedDatas.pic).toEqual(carsDB[0].pic)
	expect(updatedDatas.style).toEqual(carsDB[0].style)
	expect(updatedDatas.type).toEqual(carsDB[0].type)
	expect(updatedDatas.bestSeller).toEqual(carsDB[0].bestSeller)
})

// test getDeleteCar
it('makes sure the getDeleteCar route need auth', async() => {
	await session(app)
		.get('/delete-car/67546')
		.send()
		.expect('Location', '/admin/getsignin')
})

it('delete a car', async() => {
	const resp = await global.signin()

	// save/set original review
	const dataSample = new Car({
		serie:'serie',
		serieDetails:'serieDetails',
		wheel: 4,
		engine:'engine',
		grade:'grade',
		price:'12345.45',
		color:'color',
		details:'details',
		pic:'http://urlPicture.com',
		style:'style',
		type:'string',
		bestSeller:'1'
	})
	const carSaved = await dataSample.save()

	// delete the review
	await resp
		.get(`/delete-car/${carSaved._id}`)
		.send()

	// get the reviews
	const carsDB = await Car.find()	
	
	expect(carsDB.length).toEqual(0)
})

