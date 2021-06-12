'use strict'

require("fastify-mongoose-driver").decorator()

module.exports = async function (fastify, opts) {
  	fastify.get('/', async function (request, reply) {
	  	const cars = await fastify.mongoose.Cars.find()
	  	console.log('cars from fastify: ', cars)
    		
	  	return "tous roule !!!!"
	})
}
