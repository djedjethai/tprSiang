// const request = require('supertest')
const app = require('../../index')
const session = require('supertest-session')

const keys = require('../../config/keys')

const dataSample = {
		name:'addReview',
		comment:'comment addReview',
		picUrl:'http://urlPicture.com',
		quand: Date.now()
}


it('get all the cars', async() => {
	const resp = await global.signin()
	
	const response = await resp
				.get('/reviews')
				.send()
				.expect(200)
})

it('add some reviews', async() => {
	const resp = await global.signin()
	
	await resp
		.post('/add-review')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send(JSON.stringify(dataSample))
		.expect(200)
})

