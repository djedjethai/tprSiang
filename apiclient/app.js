'use strict'
const path = require('path')
const AutoLoad = require('fastify-autoload')

const carSchema = require('./models/Car')
const keys = require('./config/keys')


module.exports = async function (fastify, opts) {
  	// Place here your custom code!
	fastify.register(
		require('fastify-mongoose-driver').plugin,
		{
			uri: keys.mongoURI,
			settings: {
				useUnifiedTopology: true,
				useNewUrlParser: true,
				config: {
					autoIndex: true
				}
			},
			models:[{
				name: 'cars',
				alias: 'Cars',
				schema: carSchema 
			}]
		},
		err => {
			if(err){
				console.log('err in mongoose connect :'. err)
			}
		}
	)

	
	fastify.register(require('fastify-redis'), { host: keys.redisHost })
	
	// block methods post/delete etc.... See if not disturb redis ??

  	fastify.register(AutoLoad, {
  	  dir: path.join(__dirname, 'plugins'),
  	  options: Object.assign({}, opts)
  	})

  	fastify.register(AutoLoad, {
  	  dir: path.join(__dirname, 'routes'),
  	  options: Object.assign({}, opts)
  	})
}
