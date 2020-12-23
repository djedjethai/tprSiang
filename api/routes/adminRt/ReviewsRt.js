const { getReviews } = require('../../controllers/adminCt/ReviewsCt')

module.exports = app => {
	app.get('/reviews', getReviews)
}
