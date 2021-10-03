const app = require("../../../index.js")
const Car = require('mongoose').model('Car')
const Picmain = require('mongoose').model('Picmain')
const Review = require('mongoose').model('Review')
const request = require('supertest')



it('make sure the req return PicsStyle and Cardatas and reviews', async() => {
	// Arrange
	const picMainSample = new Picmain({
		pic:'http://urlMainPic.com'
	})
	
	// save datas
	const carSaved = await saveCars()
	const picSaved = await picMainSample.save()
	await saveReviews()

	// Act
	// const response = await session(app)
	const response = await request(app)
		.get(`/main`)
		.send()
		.expect(200)

	console.log(response.body)
	// Assert
	expect(response.body.carsData[0]._id.toString()).toEqual(carSaved._id.toString())
	expect(response.body.mainPics[0]._id.toString()).toEqual(picSaved._id.toString())
	
	// test the order of the reviews ... look like we have a pb...
	expect(response.body.reviews.length).toEqual(3)
})

async function saveCars(){
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
		bestSeller:'true'
	})

	const carSample1 = new Car({
		serie:'Smart1',
		serieDetails:'serieDetails1',
		wheel: 41,
		engine:'engine1',
		grade:'grade1',
		price:'12345.451',
		color:'color1',
		details:'details1',
		pic:'http://urlPicture1.com',
		style:'style1',
		type:'string1',
		bestSeller:'false1'
	})

	const carSaved = await carSample.save()
	await carSample1.save()

	return carSaved
}

async function saveReviews() {
	const reviewSample = new Review({
		name: 'myName',
		comment: 'this is my comment',
		pic: 'http://urlPic.com',
		quand: Date.now()
	})
	const reviewSample1 = new Review({
		name: 'myName1',
		comment: 'this is my comment1',
		pic: 'http://urlPic1.com',
		quand: Date.now()
	})
	const reviewSample2 = new Review({
		name: 'myName2',
		comment: 'this is my comment2',
		pic: 'http://urlPic2.com',
		quand: Date.now()
	})
	const reviewSample3 = new Review({
		name: 'myName3',
		comment: 'this is my comment3',
		pic: 'http://urlPic3.com',
		quand: Date.now()
	})

	await reviewSample.save()
	await reviewSample1.save()
	await reviewSample2.save()
	await reviewSample3.save()
}

