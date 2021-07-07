const { getPicsmain, 
	getDeletePicsmain,
	getChoicePicsmain,
	postAddPicsmain 
} = require('../../controllers/adminCt/picsmainCt')
const isAuth = require('../../middleware/isAuth')
const isToken = require('../../middleware/isToken')

module.exports = app => {
	app.get('/picsmain', isAuth, getPicsmain)
	app.get('/delete-picsmain/:id', isAuth, getDeletePicsmain)
	app.get('/choice-picsmain', isAuth, getChoicePicsmain)

	app.post('/add-picsmain', isToken, postAddPicsmain)
}


