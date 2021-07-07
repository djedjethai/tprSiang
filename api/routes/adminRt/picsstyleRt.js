const { 
	getPicsstyle,
	getDeletePicsstyle,
	getChoicePicsstyle,
	postAddPicsstyle,
	getModifyPicsstyle,
	postModifyPicsstyle
} = require('../../controllers/adminCt/picsstyleCt')
const isAuth = require('../../middleware/isAuth')
const isToken = require('../../middleware/isToken')

module.exports = app => {
	app.get('/picsstyle', isAuth, getPicsstyle)
	app.get('/delete-picsstyle/:id', isAuth, getDeletePicsstyle)
	app.get('/choice-picsstyle', isAuth, getChoicePicsstyle)
	app.get('/modify-picsstyle/:id', isAuth, getModifyPicsstyle)

	app.post('/add-picsstyle', isToken, postAddPicsstyle)
	app.post('/modify-picsstyle/:id', isAuth, postModifyPicsstyle)
}
