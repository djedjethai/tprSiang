const bcrypt = require('bcryptjs');
const logger = require('../../services/logger')
const keys = require('../../config/keys')
const { AuthError } = require('../../error/listErrors')


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

exports.getLogout = (req, res, next) => {
	req.session.destroy(err => {
		res.redirect('/admin/getsignin')
	})
}
