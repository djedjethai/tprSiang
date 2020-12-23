const { getCars } = require('../../controllers/adminCt/carsCt')
const isAuth = require('../../middleware/isAuth')

module.exports = app => {
	app.get('/cars', isAuth,  getCars)
}
