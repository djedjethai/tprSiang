const Picmain = require('mongoose').model('Picmain')
const Review = require('mongoose').model('Review')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


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

		// console.log('final datas: ', dataToReturn)
		
		// res.send("final data")
		res.send(dataToReturn)

	} catch(e) {
		// sett up the err !, use the already setted-up class 
		// console.log('from front, req main: ', e)
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}		
}

