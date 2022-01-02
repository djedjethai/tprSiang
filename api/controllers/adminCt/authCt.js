const bcrypt = require('bcryptjs');
const logger = require('../../services/logger')
const keys = require('../../config/keys')
const { AuthError } = require('../../error/listErrors')
const { setDataInRedis, cacheEnum } = require('../../services/cache')
const { encrypt, saveToken } = require('../../services/token') 

exports.getSignin = (req, res, next) => {
    	// temporary code to generate the password for the admin envVar
	// const saltRounds = 10;
	// const myPlaintextPassword = 'jerome';
	// bcrypt.genSalt(saltRounds, function(err, salt) {
	// 	bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
	// 		// Store hash in your password DB
	// 		console.log('the hash to save: ',hash)
	// 	}); 	
	// });

	res.render('auth/signin', {
        	pageTitle: 'signInForm',
       	 	path: '/signin',
        	editing: false,
        	test: 'alors',
        	errorDetails: ''
    	});
}

exports.postSignin = async (req, res, next) => {	
    	const user = req.body.name
	const password = req.body.password

	if (!password || (user !== keys.adminName1)) {
		logger.error(`auth signin ${password} or ${user} are incorrect`)
		res.redirect('/admin/getsignin')
		return
	}

	try {
		const match = await bcrypt.compare(password, keys.adminPassword1)

		if(match) {
			//login 
			req.session.isLoggedIn = true
			req.session.user = user
			
			res.redirect('/admin/cars')
			return
					}
		else{	
			throw new AuthError('password incorrect')
		}
	}
	catch(e) {
		logger.error(`err when bcrypt compare password: ${e}`)
		next(e)
		return
	}
}

exports.getLogout = async (req, res, next) => {
	// create a new token and save it to redis, 
	// for the standbye stored token to be unknow from anyone
	try{
		const token = Math.random().toString(36).split('.')[1].slice(0, 10)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) throw Error('getLogout - token is not save')
	} catch(e) {
		logger.error(`getLogout new token for stadbye err: ${e}`)	
	}	

	req.session.destroy(err => {
		res.redirect('/admin/getsignin')
	})
}
