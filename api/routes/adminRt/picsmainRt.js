const { getPicsmain, 
	getDeletePicsmain,
	getPresignurlPicsmain,
	postAddPicsmain 
} = require('../../controllers/adminCt/picsmainCt')
const isAuth = require('../../middleware/isAuth')
// const tokenAuth = require('../../middleware/tokenAuth')

module.exports = app => {
	app.get('/picsmain', isAuth, getPicsmain)
	app.get('/delete-picsmain/:id', getDeletePicsmain)
	app.get('/presignurl-picsmain', getPresignurlPicsmain)

	app.post('/add-picsmain', postAddPicsmain)
}


