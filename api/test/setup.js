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

// afterEach(async() => {	
// 	mock.restore();	
// })

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

// const { readFile, writeFile } = require('fs').promises
// const { join } = require('path')
// global.createFile = async() => {
// 	const pathToken = join('/','opt','app','tmp','token.txt')
// 	
// 	await writeFile(pathToken, 'thisd is a test', {encoding:'utf8'})
// 	
// 	const check = await readFile(pathToken, 'utf8')
// 	console.log('grrrrr: ', check)
// 
// }
