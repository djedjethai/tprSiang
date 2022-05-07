const { body } = require('express-validator')
const { getSignin, postSignin, getLogout } = require('../../controllers/adminCt/authCt')

module.exports = app => {

	app.get('/getsignin', getSignin)
	app.post('/postsignin', 
		[	
			body('name').not().isEmpty().trim().escape(),
			body('password').not().isEmpty().trim().escape()
		],
		postSignin
	)
	app.get('/logout', getLogout)
}
