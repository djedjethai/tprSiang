const { getCars,
	getAddCar,
	getEditCar,
	getDeleteCar,
	postAddCar,
	postEditCar
} = require('../../controllers/carsCt')
const isAuth = require('../../middleware/isAuth')

module.exports = app => {
	app.get('/cars', isAuth, getCars)
	app.get('/add-car', getAddCar)
	app.get('/edit-car/:id', getEditCar)
	app.get('/delete-car/:id', getDeleteCar)
	
	app.post('/add-car', postAddCar)
	app.post('/edit-car/:id', postEditCar)
}
