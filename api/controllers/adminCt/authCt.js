const bcrypt = require('bcryptjs');

const keys = require('../../config/keys')

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
	console.log(keys.adminName1)
    	const user = req.body.name
	const password = req.body.password
	
	if (!password || (user !== keys.adminName1)) {
		res.redirect('/admin/getsignin')
		return
	}

	try {
		console.log('euuuu')
		console.log(keys.adminPassword1)
		console.log(password)
		const match = await bcrypt.compare(password, keys.adminPassword1)
		console.log('bcrypt works')

		console.log(match)
		if(match) {
			//login 
			req.session.isLoggedIn = true
			req.session.user = user
				
			return req.session.save((err) => {
				res.render('tprmain/cars', {
        				pageTitle: 'tprmain',
        				path: '/cars',
        				editing: false,
        				test: 'alors',
        				// errorMessage: err[0],
        				errorDetails: ''
    				});
			})
		}
		else{	
			// next(new Error('Invalid credentials'))
			console.log('in the hhhhhhhhh')
			// res.redirect('/admin/getsignin')

			// should log this err to see if someone try
			throw new Error('jjjjjjj')
		}
	}
	catch(e) {
		console.log('ooookkkkkk')
		// should log this err as well 
		res.redirect('/admin/getsignin')
		return
		next(new Error('A technical problem occur, please try again'))
	}

}

exports.postLogout = (req, res, next) => {
	req.session.destroy(err => {
		res.redirect('/admin/getsignin')
	})
}
