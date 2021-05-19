const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const session = require('supertest-session')

const keys = require('../config/keys')
const app = require('../index')


let mongo 
beforeAll(async() => {
	// process.env.NODE_ENV = 'test'

	mongo = new MongoMemoryServer()
	const mongoUri = await mongo.getUri()

	await mongoose.connect(mongoUri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
})

beforeEach(async() => {
	const collections = await mongoose.connection.db.collections()

	for(let c of collections){
		await c.deleteMany({})
	}
})

afterAll(async() => {
	await mongo.stop()
	await mongoose.connection.close()
})

global.signin = async() => {
	let testSession = session(app)

	return await new Promise((resolve, reject) => { 
		testSession.post('/postsignin')
			.set('Content-Type','application/x-www-form-urlencoded')
			.send({
				name: keys.adminName1,
				password: keys.adminPasswordClear
			})
			.end(err => {
				if(err) reject(err)
				resolve(testSession)
			})
	})
} 

