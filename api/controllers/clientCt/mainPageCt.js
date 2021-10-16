const Picmain = require('mongoose').model('Picmain')
const Car = require('mongoose').model('Car')
const Review = require('mongoose').model('Review')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')
const logger = require('../../services/logger')

module.exports = async(req, res, next) => {
	try{

		let [mainPicsData, carsData, reviewsData] = await Promise.all([
			fromRedis(cacheEnum.mainPics),
			fromRedis(cacheEnum.mainCars),
			fromRedis(cacheEnum.mainReviews)
		])

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
			carsData,
			reviews: reviewsData
		}
		
		// res.send("final data")
		res.send(dataToReturn)

	} catch(e) {
		logger.error(`clientCt mainPageCt: ${e}`)
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}		
}

