const fs = require('fs'); 
const devprod = require('../config/devprod')

const logger = require('./logger')


// from dockerSecrets
const prod = (secretNameAndPath) => {
	try {
    		return fs.readFileSync(`${secretNameAndPath}`, 'utf8');
  	} catch(err) {
    		if (err.code !== 'ENOENT') {
      			logger.error(`An error occurred while trying to read the secret: ${secretNameAndPath}. Err: ${err}`);
    		} else {
      			logger.debug(`Could not find the secret, probably not running in swarm mode: ${secretNameAndPath}. Err: ${err}`);
    		}    
    		return false;
	}
};

// from config during development
const dev = (secretName) => {
	return devprod[secretName]
}

module.exports = { prod, dev }

