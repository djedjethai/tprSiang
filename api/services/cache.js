const mongoose = require('mongoose')

const keys = require('../config/keys')
const redis = require('redis')
const redisClient = redis.createClient({
	host: keys.redisHost,
	port: keys.redisPort,
	retry_strategy: () => 1000
})
// const redisPublisher = redisClient.duplicate()

// ref to the prototype.exec func
const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.exec = function() {
    	console.log('i am going to run a query')
    
    	console.log(this.getQuery())
    	console.log(this.mongooseCollection.name)
    	const queryContent = this.getQuery()
	const name = this.mongooseCollection.name
	
	console.log(Object.keys(queryContent).length)
    	//redisClient.del('cars')
	
	// delete full collection/type
	// redisClient.del(this.mogooseCollection.name)
		
	//for now simple logic to delete full collection cache 
	//at update/delete/creation of a tupple of this collection
	// DOES NOT WORK AS WHEN GET COLLECTION, CONDITION IS TRUE
	if(Object.keys(queryContent).length === 0){
		console.log('DELETE CACHE')
		redisClient.del(name)

		// an idea of logic for single car cache
		// if(name === 'cars'){
		// 	const key = Object.assign({}, this.getQuery(), {
		// 		collection: this.mongooseCollection.name
		// 	})
		// 	redisClient.del(JSON.stringify(key))
		// }
	}

    	return exec.apply(this, arguments)
}
