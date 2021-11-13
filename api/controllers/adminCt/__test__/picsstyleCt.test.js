const app = require('../../../index')
const session = require('supertest-session')
const keys = require('../../../config/keys')
const PicsStyle = require('mongoose').model('Picstyle')

//  test get picstyle
it('makes sure getPicstyle need authentification', async() => {
	await session(app)
		.get('/picsstyle')
		.send()
		.expect('Location', '/admin/getsignin')

})

it('get all the picstyle', async() => {
	const resp = await global.signin()
	
	await resp
		.get('/picsstyle')
		.send()
		.expect(200)
})

// test postPicstyle, all token logic is tested separatly
it('add some correct picstyle', async() => {
	
	const dataSample = new PicsStyle({
		style:'Smart',
		pic:'http://urlPicture.com',
	})
	const savedDts = await dataSample.save()

	const picsstyleDB = await PicsStyle.find()

	expect(dataSample.style).toEqual(picsstyleDB[0].style)	
	expect(dataSample.pic[0]).toEqual(picsstyleDB[0].pic[0])	
})


// test postEditPicstyle 
it('makes sure postEditPicsstyle need authentification', async() => {
	await session(app)
		.get('/modify-picsstyle/:id')
		.send()
		.expect('Location', '/admin/getsignin')

})

it('update picsstyle', async() => {
	const resp = await global.signin()

	// save/set original review
	const dataSample = new PicsStyle({
		style: 'Smart',
		pic:'http://urlCanNotUpdate.com',
	})
	const picsstyleSaved = await dataSample.save()

	// create updated review
	const updatedDatas = {
		style: 'Sedan',
		pic:'http://urlCanNotUpdate.com',
	}
	// save updated datas
	await resp
		.post(`/modify-picsstyle/${picsstyleSaved._id}`)
		.set('Content-Type','application/x-www-form-urlencoded')
		.send(updatedDatas)
		.expect(302)

	// get the reviews
	const picsstyleDB = await PicsStyle.find()	

	expect(updatedDatas.name).toEqual(picsstyleDB[0].name)
	expect(updatedDatas.comment).toEqual(picsstyleDB[0].comment)
})

// test getDeleteReview
it('makes sure the getDeletePicsstyle route need auth', async() => {
	await session(app)
		.get('/delete-picsstyle/67546')
		.send()
		.expect('Location', '/admin/getsignin')
})

it('delete a picsstyle', async() => {
	const resp = await global.signin()

	// save/set original review
	const dataSample = new PicsStyle({
		style:'Smart',
		pic:'http://urlPicture.com',
	})
	const picsstyleSaved = await dataSample.save()

	// delete the review
	await resp
		.get(`/delete-picsstyle/${picsstyleSaved._id}`)
		.send()

	// get the reviews
	const picsstyleDB = await PicsStyle.find()	
	
	expect(picsstyleDB.length).toEqual(0)
})


