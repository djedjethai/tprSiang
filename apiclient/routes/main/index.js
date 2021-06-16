'use strict'
require("fastify-mongoose-driver").decorator()

const fromRedis = require('../../services/redisHelper')

module.exports = async function (fastify, opts) {
  	fastify.get('/', async function (request, reply) {
		const { redis } = fastify

		const carval = await fromRedis(redis, 'cars')
		
		if(!carval){
	  		const cars = await fastify.mongoose.Cars.find()
	  	
			const carToRedis = JSON.stringify(cars)
			redis.set('cars', carToRedis)

	  		return "from db !!!!"
		}
		
		console.log('parsed dts :', carval)
	  	return "from redis !!!!"
	})
}
