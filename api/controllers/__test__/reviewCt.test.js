// const request = require('supertest')
const { readFile } = require('fs').promises
const app = require('../../index')
const session = require('supertest-session')

const keys = require('../../config/keys')


it('can not be access without authentification', async() => {
	await session(app)
		.get('/reviews')
		.send()
		.expect('Location', '/admin/getsignin')

})

it('get all the reviews', async() => {
	const resp = await global.signin()
	
	await resp
		.get('/reviews')
		.send()
		.expect(200)
})

// test works but do not verify anything, as a 200 code is returned in any cases
it('save token', async() => {
	const resp = await global.signin()
	
	await resp
		.get('/add-review')
		.send()
		.expect(200)
	
})

it('add some correct reviews', async() => {
	const resp = await global.signin()
	
	const dataSample = {
		name:'addReview',
		comment:'comment addReview',
		picUrl:'http://urlPicture.com',
		quand: Date.now()
	}

	await resp
		.post('/add-review')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send(JSON.stringify(dataSample))
		.expect(200)
})

it('add some incorrect picUrl field', async() => {
	const resp = await global.signin()
	
	const dataSample = {
		name:'addReview',
		comment:'comment addReview',
		nopicUrlfield:'http://urlPicture.com',
		quand: Date.now()
	}

	const response = await resp
		.post('/add-review')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send(JSON.stringify(dataSample))
		.expect(417)
})

it('update a review', async() => {
	const resp = await global.signin()

	// save review
	const dataSample = {
		name:'addReview',
		comment:'comment addReview',
		picUrl:'http://urlPicture.com',
		quand: Date.now()
	}

	const response = await resp
		.post('/add-review')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send(JSON.stringify(dataSample))
		.expect(200)

	// get the reviews


	// use the reviews's id to update the saved review
	


	// expect to:  .expect('Location', '/admin/reviews')


	// const newDataSample = {
	// 	name:'addReview',
	// 	comment:'comment addReview',
	// 	quand: Date.now()
	// }

	// const response = await resp
	// 	.post('/add-review/qwerty')
	// 	.set('Content-Type','application/x-www-form-urlencoded')
	// 	.send(JSON.stringify(newDataSample))
	// 	.expect('Location', '/admin/reviews')
})

