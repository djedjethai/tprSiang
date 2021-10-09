const app = require("../../../index.js")
const Picmain = require('mongoose').model('Picmain')
const Car = require('mongoose').model('Car')
const request = require('supertest')

it('make sure the req return PicsStyle and reviews', async() => {
	// Arrange
	const picMainSample = new Picmain({
		pic:'http://urlMainPic.com'
	})
	const picMainSample2 = new Picmain({
		pic:'http://urlMainPic2.com'
	})
	const picMainSample3 = new Picmain({
		pic:'http://urlMainPic3.com'
	})

	// save datas
	await picMainSample.save()
	await picMainSample2.save()
	await picMainSample3.save()
	await saveCars()

	// Act
	// /model will be translate by the api to รุนรถ
	const response = await request(app)
		.get(`/type/model`)
		.send()
		.expect(200)

	// Assert
	expect(response.body.mainPics.length).toEqual(3)
	expect(response.body.carsData.length).toEqual(2)
})

async function saveCars(){
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
		type:'รุนรถ',
		bestSeller:'true'
	})

	const carSample1 = new Car({
		serie:'theserie1',
		serieDetails:'serieDetails1',
		wheel: 41,
		engine:'engine1',
		grade:'grade1',
		price:'12345.451',
		color:'color1',
		details:'details1',
		pic:'http://urlPicture1.com',
		style:'Smart',
		type:'รถยนฅ์นั่งส่วนบุคคล',
		bestSeller:'false1'
	})
	
	const carSample2 = new Car({
		serie:'theserie2',
		serieDetails:'serieDetails2',
		wheel: 42,
		engine:'engine2',
		grade:'grade2',
		price:'12345.452',
		color:'color2',
		details:'details2',
		pic:'http://urlPicture2.com',
		style:'Double',
		type:'รุนรถ',
		bestSeller:'true'
	})


	await carSample.save()
	await carSample1.save()
	await carSample2.save()
}

