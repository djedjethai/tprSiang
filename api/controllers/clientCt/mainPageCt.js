const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')


module.exports = async(req, res) => {
	try{

		const carsData = await fromRedis(cacheEnum.mainCarReview)

		if(!carsData){
			// query the db where bestSeller == true
			const cars = await Car.find()

			// save cars to redis for next req, 
			// will need to add other mainPage datas
			const carsToRedis = JSON.stringify(cars)
			setDataInRedis(cacheEnum.mainCarReview, carsToRedis)
			
			console.log('cars from db to show on main page :', cars)

			res.send("from db")
		}

		console.log('cars from redis to show on main page: ', carsData)
		res.send("from redis")

	} catch(e) {
		console.log('from front, req main: ', e)
	}		
}
