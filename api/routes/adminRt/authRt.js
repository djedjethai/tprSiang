//const express = require('express')
//const router = express.Router()

const { getSignin, postSignin, getLogout } = require('../../controllers/adminCt/authCt')

// router.get('/getsignin', getSignin)
// router.post('/postsignin', postSignin)
// router.get('/logout', postLogout)

// module.exports = router 

module.exports = app => {
	app.get('/getsignin', getSignin)
	app.post('/postsignin', postSignin)
	app.get('/logout', getLogout)
}
