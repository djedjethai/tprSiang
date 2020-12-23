const { getPicsstyle } = require('../../controllers/adminCt/picsstyleCt')

module.exports = app => {
	app.get('/picsstyle', getPicsstyle)
}
