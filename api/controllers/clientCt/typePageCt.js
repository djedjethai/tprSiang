const Picmain = require('mongoose').model('Picmain')
const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')
const translator = require('../../services/translator')

module.exports = async(req, res, next) => {
	const { type } = req.params

	// transalte from eng to thai
	const data = translator(type)
	
	try{
		let [mainPicsData, typePicsData] = await Promise.all([
			fromRedis(cacheEnum.mainPics),
			fromRedis(`${cacheEnum.carsType}${data}`)
		])

		if(!mainPicsData) {
			mainPicsData = await Picmain.find() 
			setDataInRedis(cacheEnum.mainPics, JSON.stringify(mainPicsData))
		}

		if(!typePicsData){
			typePicsData = await Car.find({type: `${data}`})
			setDataInRedis(cacheEnum.carsType+data, JSON.stringify(typePicsData))
		}

		const dataToReturn = {
			mainPics: mainPicsData,
			carsData: typePicsData
		}
	
		res.send(dataToReturn)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
