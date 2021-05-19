const app = require('../../index')
const session = require('supertest-session')

const keys = require('../../config/keys')

it('show the signin form page', async() => {	
	await session(app)
		.get('/getsignin')
		.send()
		.expect(200)
})

it('signin with correct credentials', async() => {

	await session(app)
		.post('/postsignin')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send({
			name: keys.adminName1,
			password: keys.adminPasswordClear
		})
		.expect('Location', '/admin/cars')
})

it('signin with wrong name', async() => {
	await session(app)
		.post('/postsignin')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send({
			name: 'jgfjfdu',
			password: keys.adminPasswordClear
		})
		.expect('Location', '/admin/getsignin')	
})

it('signin with wrong password', async() => {
	const response = await session(app)
		.post('/postsignin')
		.set('Content-Type','application/x-www-form-urlencoded')
		.send({
			name: keys.adminName1,
			password: 'iytruity'
		})
	expect(response.res.headers.location).not.toEqual('/admin/getsignin')
	expect(response.res.headers.location).not.toEqual('/admin/cars')
})

it('logout', async() => {
	await session(app)
		.get('/logout')
		.send()
		.expect('Location', '/admin/getsignin')
})


