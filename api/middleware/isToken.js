const crypto = require('crypto')
const fs = require('fs').promises
const { verify } = require('../services/token')

module.exports = async(req, res, next) => {
	  
	const hash = JSON.parse(Object.keys(req.body)[0]).token

	const secret = await fs.readFile('/opt/app/tmp/token.txt','utf8')

	if( await verify(secret, hash) === false) {
		res.status(404).send('wrong path')
		return
	}
	next()
}

		    
