const Picmain = require('mongoose').model('Picmain')
const Review = require('mongoose').model('Review')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')
const logger = require('../../services/logger')

module.exports = async(req, res, next) => {
	try{
		// console.log('in herrrreee')

		let [mainPicsData, reviewsData] = await Promise.all([
			fromRedis(cacheEnum.mainPics),
			fromRedis(cacheEnum.reviews)
		])

		// let mainPicsData = null
		if(!mainPicsData) {
			mainPicsData = await Picmain.find() 
			setDataInRedis(cacheEnum.mainPics, JSON.stringify(mainPicsData))
		}
		
		// let reviewsData = null
		if(!reviewsData) {
			reviewsData = await Review.find().sort('-quand').limit(20)
			setDataInRedis(cacheEnum.reviews, JSON.stringify(reviewsData))
		}

		const dataToReturn = {
			mainPics: mainPicsData,
			reviews: reviewsData
		}

		res.send(dataToReturn)

	} catch(e) {
		logger.error(`clientCt reviewsPageCt: ${e}`)
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}		
}

