const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')
const request = require('supertest')

const keys = require('../config/keys')
const app = require('../index')

beforeAll(async() => {
	process.env.NODE_ENV = 'test'

	const mongo = new MongoMemoryServer()
	const mongoURI = await mongo.getUri()

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
	await mongoose.connction.close()
})

