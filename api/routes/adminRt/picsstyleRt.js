const { 
	getPicsstyle,
	getDeletePicsstyle,
	getPresignurlPicsstyle,
	postAddPicsstyle,
	getModifyPicsstyle,
	postModifyPicsstyle
} = require('../../controllers/adminCt/picsstyleCt')
const isAuth = require('../../middleware/isAuth')

module.exports = app => {
	app.get('/picsstyle', isAuth, getPicsstyle)
	app.get('/delete-picsstyle/:id', getDeletePicsstyle)
	app.get('/presignurl-picsstyle', getPresignurlPicsstyle)
	app.get('/modify-picsstyle', getModifyPicsstyle)

	app.post('/add-picsstyle', postAddPicsstyle)
	app.post('/modify-picsstyle/:id', postModifyPicsstyle)
}
