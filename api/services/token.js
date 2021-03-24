const crypto = require('crypto')
const fs = require('fs')
const { promisify } = require('util')

async function encrypt(password) {
	return new Promise((resolve, reject) => {
	        // generate random 16 bytes long salt
	        const salt = crypto.randomBytes(16).toString("hex")
	
	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) reject(err);
	            resolve(salt + ":" + derivedKey.toString('hex'))
	        });
	 })
}

async function saveToken(token) {
	try{
		const fd = await promisify(fs.open)('/opt/app/tmp/token.txt', 'w')
  		await promisify(fs.appendFile)(fd, token, 'utf8')
        	const err = await promisify(fs.close)(fd)
		
		if(err) throw Error('error in close: ', err)
		else return true

	} catch(e) {
		console.log('error from save token: ', e)
		return false
	}	
}



module.exports = { encrypt, saveToken }
