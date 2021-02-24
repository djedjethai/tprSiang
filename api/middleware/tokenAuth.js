module.exports = (req, res, next) => {
	// if (!req.session.isLoggedIn) {
	// 	return res.redirect('/admin/getsignin')
	// 	    
	// }   

	console.log('in the tokenAuth: ', req.boby)

	// okkk, set the logique to bcrypt req.body.token
	// if not ok, return auth

	next()
}

		    
