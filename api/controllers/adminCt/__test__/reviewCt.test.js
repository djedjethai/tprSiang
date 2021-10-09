const app = require('../../../index')
const session = require('supertest-session')
const keys = require('../../../config/keys')
const Review = require('mongoose').model('Review')

//  test get reviews
it('makes sure getReviews need authentification', async() => {
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

// test postAddReviews, all token logic is tested separatly
it('add some correct reviews', async() => {
	
	const dataSample = new Review({
		name:'addReview',
		comment:'comment addReview',
		picUrl:'http://urlPicture.com',
		quand: Date.now()
	})
	const savedDts = await dataSample.save()

	const reviewsDB = await Review.find()

	expect(dataSample.name).toEqual(reviewsDB[0].name)
	expect(dataSample.comment).toEqual(reviewsDB[0].comment)	
	expect(dataSample.picUrl).toEqual(reviewsDB[0].picUrl)	
})

// thest the mock
// it('test getAddReview', async() => {
// 	const resp = await global.signin()
// 	mock({
// 		'/opt/app/tmp/token.txt': ''
// 	});
// 
// 	await resp
// 		.get('/add-review')
// 		.send()
// 		.expect(200)
// })
	
// does not work as can test the token in query
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
it('makes sure postEditReviews need authentification', async() => {
	await session(app)
		.get('/edit-review/:id')
		.send()
		.expect('Location', '/admin/getsignin')

})

it('update a review', async() => {
	const resp = await global.signin()

	// save/set original review
	const dataSample = new Review({
		name:'addReview',
		comment:'comment addReview',
		picUrl:'http://urlCanNotUpdate',
		quand: Date.now()
	})
	const reviewSaved = await dataSample.save()

	// create updated review
	const updatedDatas = {
		name:'addReview updated',
		comment:'comment addReview updated',
		picUrl:'http://urlCanNotUpdate',
		quand: Date.now()
	}
	// save updated datas
	await resp
		.post(`/edit-review/${reviewSaved._id}`)
		.set('Content-Type','application/x-www-form-urlencoded')
		// .send(JSON.stringify(updatedDatas))
		.send(updatedDatas)
		.expect(302)

	// get the reviews
	const reviewsDB = await Review.find()	

	expect(updatedDatas.name).toEqual(reviewsDB[0].name)
	expect(updatedDatas.comment).toEqual(reviewsDB[0].comment)
})

// test getDeleteReview
it('makes sure the getDeleteReview route need auth', async() => {
	await session(app)
		.get('/delete-review/67546')
		.send()
		.expect('Location', '/admin/getsignin')
})

it('delete a review', async() => {
	const resp = await global.signin()

	// save/set original review
	const dataSample = new Review({
		name:'addReview',
		comment:'comment addReview',
		picUrl:'http://urlPicture.com',
		quand: Date.now()
	})
	const reviewSaved = await dataSample.save()

	// delete the review
	await resp
		.get(`/delete-review/${reviewSaved._id}`)
		.send()

	// get the reviews
	const reviewsDB = await Review.find()	
	
	expect(reviewsDB.length).toEqual(0)
})
