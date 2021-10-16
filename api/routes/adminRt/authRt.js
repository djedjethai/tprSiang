const { getSignin, postSignin, getLogout } = require('../../controllers/adminCt/authCt')

module.exports = app => {
	app.get('/getsignin', getSignin)
	app.post('/postsignin', postSignin)
	app.get('/logout', getLogout)
}
