const keys = require('../config/keys')
const redis = process.env.NODE_ENV === 'test' ? require('redis-mock') : require('redis')

class RedisInstance {
	    
	constructor(redis, host, port){
	        this.redis = redis
	        this.host = host
	        this.port = port
	}
	
	getInstance(){
	    	return this.redis.createClient({
	           	host: this.host,
	           	port: this.port,
	           	retry_strategy: () => 1000
	        })
	}
}
	
module.exports = new RedisInstance(redis, keys.redisHost, keys.redisPort)

