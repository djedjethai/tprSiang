const Picmain = require('mongoose').model('Picmain')
const Car = require('mongoose').model('Car')
const Review = require('mongoose').model('Review')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')


module.exports = async(req, res) => {
	try{

		let mainPicsData = await fromRedis(cacheEnum.mainPics)
		let carsData = await fromRedis(cacheEnum.mainCars)
		let reviewsData = await fromRedis(cacheEnum.mainReviews)

		if(!mainPicsData) {
			mainPicsData = await Picmain.find() 
			setDataInRedis(cacheEnum.mainPics, JSON.stringify(mainPicsData))
		}
		
		if(!carsData) {
			carsData = await Car.find({bestSeller: true})
			setDataInRedis(cacheEnum.mainCars, JSON.stringify(carsData))
		}

		if(!reviewsData) {
			reviewsData = await Review.find().sort('-quand').limit(3)
			setDataInRedis(cacheEnum.mainReviews, JSON.stringify(reviewsData))
		}

		const dataToReturn = {
			mainPics: mainPicsData,
			cars: carsData,
			reviews: reviewsData
		}

		console.log('final datas: ', dataToReturn)
		
		// res.send("final data")
		res.send(dataToReturn)

	} catch(e) {
		// sett up the err !, use the already setted-up class 
		console.log('from front, req main: ', e)
	}		
}
