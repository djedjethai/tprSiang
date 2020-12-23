const { getPicsmain } = require('../../controllers/adminCt/picsmainCt')
const isAuth = require('../../middleware/isAuth')

module.exports = app => {
	app.get('/picsmain', isAuth, getPicsmain)
}


