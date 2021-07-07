const { getCars,
	getAddCar,
	getEditCar,
	getDeleteCar,
	postAddCar,
	postEditCar
} = require('../../controllers/adminCt/carsCt')
const isAuth = require('../../middleware/isAuth')
const isToken = require('../../middleware/isToken')

module.exports = app => {
	app.get('/cars', isAuth, getCars)
	app.get('/add-car', isAuth, getAddCar)
	app.get('/edit-car/:id', isAuth, getEditCar)
	app.get('/delete-car/:id', isAuth, getDeleteCar)
	
	app.post('/add-car', isToken, postAddCar)
	app.post('/edit-car/:id', isAuth, postEditCar)
}
