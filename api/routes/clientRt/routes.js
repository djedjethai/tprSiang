const mainPage = require('../../controllers/clientCt/mainPageCt')
const typePage = require('../../controllers/clientCt/typePageCt')
const stylePage = require('../../controllers/clientCt/stylePageCt')
const carPage = require('../../controllers/clientCt/carPageCt')
const reviewsPage = require('../../controllers/clientCt/reviewsPageCt')

module.exports = app => {
	app.get('/main', mainPage)
	app.get('/type/:type', typePage)
	app.get('/style/:style', stylePage)
	app.get('/car/:id', carPage)
	app.get('/reviewsClient', reviewsPage)
}
