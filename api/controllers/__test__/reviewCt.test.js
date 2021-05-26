// const request = require('supertest')
// const { readFile } = require('fs').promises
const app = require('../../index')
const session = require('supertest-session')
// const { join } = require('path')
const mock = require('mock-fs')

const keys = require('../../config/keys')


it('can not be access getReviews without authentification', async() => {
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

	jest.mock('fs')

	const MOCK_FILE_INFO = {
    		'/opt/app/tmp/token.txt': ''
  	};	

	require('fs').__setMockFiles(MOCK_FILE_INFO)
	
	await resp
		.get('/add-review')
		.send()
		.expect(200)
	
	mock.restore();	
})

// test postAddReview
// it('can not be access postAddReviews without authentification', async() => {
// 	const response = await session(app)
// 		.get('/add-review')
// 		.send()
// 		// .expect('Location', '/admin/getsignin')
// 	
// 	console.log(response)
// 	expect(response).toEqual(404)
// 
// })
// 
// it('add some correct reviews', async() => {
// 	const resp = await global.signin()
// 	
// 	const dataSample = {
// 		name:'addReview',
// 		comment:'comment addReview',
// 		picUrl:'http://urlPicture.com',
// 		quand: Date.now()
// 	}
// 
// 	await resp
// 		.post('/add-review')
// 		.set('Content-Type','application/x-www-form-urlencoded')
// 		.send(JSON.stringify(dataSample))
// 		.expect(200)
// })
// 
// it('add some incorrect picUrl field', async() => {
// 	const resp = await global.signin()
// 	
// 	const dataSample = {
// 		name:'addReview',
// 		comment:'comment addReview',
// 		nopicUrlfield:'http://urlPicture.com',
// 		quand: Date.now()
// 	}
// 
// 	const response = await resp
// 		.post('/add-review')
// 		.set('Content-Type','application/x-www-form-urlencoded')
// 		.send(JSON.stringify(dataSample))
// 		.expect(417)
// })

// test postEditReview
// it('can not be access postEditReviews without authentification', async() => {
// 	await session(app)
// 		.get('/edit-review/:id')
// 		.send()
// 		.expect('Location', '/admin/getsignin')
// 
// })
// 
// it('update a review', async() => {
// 	const resp = await global.signin()
// 
// 	// save review
// 	const dataSample = {
// 		name:'addReview',
// 		comment:'comment addReview',
// 		picUrl:'http://urlPicture.com',
// 		quand: Date.now()
// 	}
// 
// 	const response = await resp
// 		.post('/add-review')
// 		.set('Content-Type','application/x-www-form-urlencoded')
// 		.send(JSON.stringify(dataSample))
// 		.expect(200)

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
// })

