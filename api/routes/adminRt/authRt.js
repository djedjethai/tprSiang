const { getSignin, postSignin, postLogout } = require('../../controllers/adminCt/authCt')

module.exports = app => {
	app.get('/getsignin', getSignin)
	app.post('/postsignin', postSignin)
	app.get('/logout', postLogout)
}
