const app = require("../../../index.js")
const Car = require('mongoose').model('Car')
const PicsStyle = require('mongoose').model('Picstyle')
const request = require('supertest')

// const { fromRedis } = require('../../../services/cache')
// jest.mock('../../../services/cache')

it('make sure the req return PicsStyle and Car datas', async() => {
	// Arrange
	const carSample = new Car({
		serie:'theserie',
		serieDetails:'serieDetails',
		wheel: 4,
		engine:'engine',
		grade:'grade',
		price:'12345.45',
		color:'color',
		details:'details',
		pic:'http://urlPicture.com',
		style:'Smart',
		type:'string',
		bestSeller:'1'
	})
	const picSample = new PicsStyle({
		style:'Smart',
		pic:'http://urlPicture.com',
	})
	const picSample2 = new PicsStyle({
		style:'Smart',
		pic:'http://urlPicture2.com',
	})
	const picSample3 = new PicsStyle({
		style:'Double',
		pic:'http://urlPicture.com',
	})


	// save datas
	const svdCar = await carSample.save()
	await picSample.save()
	await picSample2.save()
	await picSample3.save()

	// Act
	// const response = await session(app)
	const response = await request(app)
		.get(`/car/${svdCar._id}?style=${carSample.style}`)
		.send()
		.expect(200)
	
	// Assert
	expect(response.body.carsData[0]._id.toString()).toEqual(svdCar._id.toString())
	expect(response.body.picsStyle.length).toEqual(2)
	// expect(fromRedis.fromRedis).toHaveBeenCalled()
})

