const app = require("../../../index.js")
const Car = require('mongoose').model('Car')
const PicsStyle = require('mongoose').model('Picstyle')
const request = require('supertest')

// const { fromRedis } = require('../../../services/cache')
// jest.mock('../../../services/cache')

it('make sure the req return PicsStyle and Car datas', async() => {
	// Arrange
	const carSample = new Car({
		serie:'Smart',
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
	const picSample = new PicsStyle({
		style:'Smart',
		pic:'http://urlPicture.com',
	})

	// save datas
	const svdCar = await carSample.save()
	await picSample.save()

	// Act
	// const response = await session(app)
	const response = await request(app)
		.get(`/car/${svdCar._id}?style=${carSample.serie}`)
		.send()
		.expect(200)
	
	// Assert
	expect(response.body.carsData[0].title).toEqual(carSample.title)
	expect(response.body.picsStyle[0].style).toEqual(picSample.style)
	// expect(fromRedis.fromRedis).toHaveBeenCalled()
})

