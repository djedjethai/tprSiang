const app = require('../../../index')
const session = require('supertest-session')
const keys = require('../../../config/keys')
const PicsMain = require('mongoose').model('Picmain')

//  test get all picsmain
it('makes sure getPicsmain need authentification', async() => {
	await session(app)
		.get('/picsmain')
		.send()
		.expect('Location', '/admin/getsignin')

})

it('get all the picsmain', async() => {
	const resp = await global.signin()
	
	await resp
		.get('/picsmain')
		.send()
		.expect(200)
})

// test postAddPicsmain, all token logic is tested separatly
it('add some correct picsmain', async() => {
	
	const dataSample = new PicsMain({
		pic:'http://urlPicture.com',
	})
	const savedDts = await dataSample.save()

	const picsmainDB = await PicsMain.find()

	expect(dataSample.pic).toEqual(picsmainDB[0].pic)	
})

// test getDeletePicsmain
it('makes sure the getDeletePicsmain route need auth', async() => {
	await session(app)
		.get('/delete-picsmain/67546')
		.send()
		.expect('Location', '/admin/getsignin')
})

it('delete a picsmain', async() => {
	const resp = await global.signin()

	// save/set original review
	const dataSample = new PicsMain({
		pic:'http://urlPicture.com',
	})
	const picsmainSaved = await dataSample.save()

	// delete the review
	await resp
		.get(`/delete-picsmain/${picsmainSaved._id}`)
		.send()

	// get the reviews
	const picsmainDB = await PicsMain.find()	
	
	expect(picsmainDB.length).toEqual(0)
})

