const request = require('supertest')
const session = require('supertest-session')
const app = require('../../index')

const keys = require('../../config/keys')

it('show the signin form page', async() => {	
	await request(app)
		.get('/getsignin')
		.send()
		.expect(200)
})

// bullshit 
it('signin with correct credentials', async() => {

	

	const response = await session(app)
		.post('/postsignin')
		.send({
			name: keys.adminName1,
			password: keys.adminPassword1
		})
		.expect('Location', '/admin/cars')

	// console.log(response.cookies)
	// expect(response.res.headers.location).toEqual('/admin/getsignin')

	// const response = await request(app)
	// 	.post('/postsignin')
	// 	.send({
	// 		name: keys.adminName1,
	// 		password: keys.adminPassword1
	// 	})
	// 	.expect('Location', '/admin/cars')
	//expect(response.res.headers.location).toEqual('/admin/getsignin')
})

it('signin with incorrect credentials', async() => {
	await request(app)
		.post('/postsignin')
		.send({
			name: 'khhgfjk',
			password: 'jhgfjgfjh'
		})
		.expect('Location', '/admin/getsignin')

	// expect(response.res.headers.location).toEqual('/admin/getsignin')
})

it('logout', async() => {
	const response = await request(app)
		.post('/postlogout')
		.send()
		.expect('Location', '/admin/getsignin')

	// console.log(response)
	// expect(response.res.headers.location).toEqual('/admin/getsignin')
})

