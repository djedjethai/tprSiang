const crypto = require('crypto')
const fs = require('fs').promises

module.exports = async(req, res, next) => {
	  
	async function verify(password, hash) {
	    return new Promise((resolve, reject) => {
	        const [salt, key] = hash.split(":")
	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) reject(err);
	            resolve(key == derivedKey.toString('hex'))
	        });
	    })
	}
	const hash = JSON.parse(Object.keys(req.body)[0]).token

	const secret = await fs.readFile('/opt/app/tmp/token.txt','utf8')

	if( await verify(secret, hash) === false) {
		console.log('i am in err')
		res.status(404).send('wrong path')
		return
	}
	next()
}

		    
