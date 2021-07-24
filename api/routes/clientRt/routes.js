const mainPage = require('../../controllers/clientCt/mainPageCt')
const picsmainPage = require('../../controllers/clientCt/picsmainPageCt')
const typePage = require('../../controllers/clientCt/typePageCt')
const stylePage = require('../../controllers/clientCt/stylePageCt')

module.exports = app => {
	app.get('/main', mainPage)
	app.get('/picsadvertise', picsmainPage)
	app.get('/type/:type', typePage)
	app.get('/style/:style', stylePage)
}
