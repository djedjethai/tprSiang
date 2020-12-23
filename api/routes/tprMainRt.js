
module.exports = (app) => {
	app.get("/mainPage", (req, res) => {
		res.status(200)
		res.send("Welcome to the main page")
	})

	app.get("/carType/:type", (req, res) => {
		const type = req.params.type
		
		res.status(200)
		res.send("welcome to the car type page, the type is: " + type)
	})

	app.get("/carDetails/:model", (req, res) => {
		const car = req.params.model

		res.status(200)
		res.send("welcome to the carDetails page, the car is: " + car)
	})
}
