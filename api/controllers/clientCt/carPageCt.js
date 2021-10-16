const Car = require('mongoose').model('Car')
const Picstyle = require('mongoose').model('Picstyle')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')
const logger = require('../../services/logger')

module.exports = async(req, res, next) => {
	const { id } = req.params
	const { style } = req.query


	try{
		let [car, carPicStyle] = await Promise.all([
			fromRedis(`${cacheEnum.car}${id}`),
			fromRedis(`${cacheEnum.picsStyle}${style}`)
		])

		if(!car){
			// console.log('alllo')
			car = await Car.find({_id: id})
			setDataInRedis(cacheEnum.car+id, JSON.stringify(car))
		}

		// let carPicStyle = null
		if(!carPicStyle){
			carPicStyle = await Picstyle.find({style: style})
			setDataInRedis(cacheEnum.picsStyle+style, JSON.stringify(carPicStyle))
		}

		const dataToReturn = {
			carsData: car,
			picsStyle: carPicStyle
		}

		res.send(dataToReturn)

	} catch(e) {
		logger.error(`clientCt carPageCt: ${e}`)
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
