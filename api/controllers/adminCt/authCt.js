const bcrypt = require('bcryptjs');

const keys = require('../../config/keys')
const { AuthError } = require('../../error/listErrors')


exports.getSignin = (req, res, next) => {
    	// const err = req.flash('error');
    	res.render('auth/signin', {
        	pageTitle: 'signInForm',
       	 	path: '/signin',
        	editing: false,
        	test: 'alors',
        	// errorMessage: err[0],
        	errorDetails: ''
    	});
}

exports.postSignin = async (req, res, next) => {
	// temporary code to generate the password for the admin envVar
	// const saltRounds = 10;
	// const myPlaintextPassword = 'jerome';
	// bcrypt.genSalt(saltRounds, function(err, salt) {
	// 	bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
	// 		// Store hash in your password DB
	// 		console.log(hash)
	// 	}); 	
	// });
	//
    	const user = req.body.name
	const password = req.body.password
	
	if (!password || (user !== keys.adminName1)) {
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
			console.log('testing err')
			throw new AuthError('password incorrect')
		}
	}
	catch(e) {
		// res.redirect('/admin/getsignin')
		
		// set an err page later
		// don t like this way easy for force brute attack
		// as well, set journal to report err
		
		// this create an err(resend res), 
		// next(new Error('A technical problem occur, please try again'))
		next(e)
		return
	}

}

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		res.redirect('/admin/getsignin')
	})
}
