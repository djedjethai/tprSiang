const mainPage = require('../../controllers/clientCt/mainPageCt')
const typePage = require('../../controllers/clientCt/typePageCt')

module.exports = app => {
	app.get('/main', mainPage)
	app.get('/type/:type', typePage)
}
