const mainPage = require('../../controllers/clientCt/mainPageCt')

module.exports = app => {
	app.get('/main', mainPage)
	// app.get('/main', (req, res) => {
	// 	res.send("jsonnnnnn")
	// })
}
