const { getSignin, postSignin, postLogout } = require('../../controllers/authCt')

module.exports = app => {
	app.get('/getsignin', getSignin)
	app.post('/postsignin', postSignin)
	app.get('/logout', postLogout)
}
