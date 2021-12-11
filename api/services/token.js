const crypto = require('crypto')
// const fs = require('fs')
const { setTokenInRedis, cacheEnum } = require('./cache')
const { promisify } = require('util')
const logger = require('./logger')

async function encrypt(password) {
	return new Promise((resolve, reject) => {
	        // generate random 16 bytes long salt
	        const salt = crypto.randomBytes(16).toString("hex")
	
	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) {
			    logger.error(`reject when encrypt password: ${err}`)
			    reject(err);
		    }
	            resolve(salt + ":" + derivedKey.toString('hex'))
	        });
	 })
}

async function verify(password, hash) {
	return new Promise((resolve, reject) => {
	        const [salt, key] = hash.split(":")
	        crypto.scrypt(password, salt, 64, (err, derivedKey) => {
	            if (err) {
			    logger.error(`reject when verify password: ${err}`)
			    reject(err);
		    }
	            resolve(key == derivedKey.toString('hex'))
	        });
	})
}

async function saveToken(token) {
	console.log("the tok in saveToken token file: ", token)
	// save to redis
	const isTokenSaved = await setTokenInRedis(cacheEnum.token, JSON.stringify(token))

	return isTokenSaved
}

module.exports = { encrypt, saveToken, verify }
