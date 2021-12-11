const crypto = require('crypto')
const { setDataInRedis, cacheEnum, fromRedis } = require('../services/cache')
const { verify } = require('../services/token')

module.exports = async(req, res, next) => {
	  
	const hash = JSON.parse(Object.keys(req.body)[0]).token

	// get token from redis
	const secret = await fromRedis(cacheEnum.token)

	if( await verify(secret, hash) === false) {
		res.status(404).send('wrong path')
		return
	}

	next()
}

		    
