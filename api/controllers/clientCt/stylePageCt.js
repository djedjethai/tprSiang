const Picmain = require('mongoose').model('Picmain')
const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


module.exports = async(req, res, next) => {
	const { style } = req.params
	
	try{
		let [mainPicsData, picsStyle] = await Promise.all([
			fromRedis(cacheEnum.mainPics),
			fromRedis(`${cacheEnum.picsStyle}${style}`)
		])

		if(!mainPicsData) {
			mainPicsData = await Picmain.find() 
			setDataInRedis(cacheEnum.mainPics, JSON.stringify(mainPicsData))
		}

		if(!picsStyle){
			picsStyle = await Car.find({style:`${style}`})
			setDataInRedis(cacheEnum.picsStyle+style, JSON.stringify(picsStyle))
		}

		const dataToReturn = {
			mainPics: mainPicsData,
			carsData: picsStyle
		}
		
		res.send(dataToReturn)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
