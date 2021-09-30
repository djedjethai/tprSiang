const app = require("../../../index.js")
const Car = require('mongoose').model('Car')
const PicsStyle = require('mongoose').model('Picstyle')
const request = require('supertest')

// jest.mock('../../../services/cache')

it('make sure the req return PicsStyle and Car datas', async() => {
	// Arrange
	const carSample = new Car({
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
	const picSample = new PicsStyle({
		style:'Smart',
		pic:'http://urlPicture.com',
	})

	// console.log("the node_env: ", process.env.NODE_ENV)
	// console.log('etst 1')

	// save datas
	const svdCar = await carSample.save()
	const svdPicSample = await picSample.save()

	// console.log('etst 2 ', svdCar._id)
	// Act
	// const response = await session(app)
	const response = await request(app)
		.get(`/car/${svdCar._id}?style=style`)
		.send()
		.expect(200)
	
	// console.log('the ressponse: ', response)
	// Assert
	//expect(response.)
})

