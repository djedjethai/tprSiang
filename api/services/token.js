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
		const print = (e,d) => {
			if(e) throw Error(e)
			else return d
		}

		// create file to save the token && save the token
		const fd = await promisify((print) => fs.open('/opt/app/tmp/token.txt', 'w', print))()
  		await promisify((print) => fs.appendFile(fd, token, 'utf8', print))()
        	fs.close(fd, err => { if(err) throw Error('error in close: ', err) } )

		return true
	} catch(e) {
		console.log('error from save token: ', e)
		return false
	}	
}



module.exports = { encrypt, saveToken }
