//const express = require('express')
//const router = express.Router()

const { getSignin, postSignin, postLogout } = require('../../controllers/authCt')

// router.get('/getsignin', getSignin)
// router.post('/postsignin', postSignin)
// router.get('/logout', postLogout)

// module.exports = router 

module.exports = app => {
	app.get('/getsignin', getSignin)
	app.post('/postsignin', postSignin)
	app.get('/logout', postLogout)
}
