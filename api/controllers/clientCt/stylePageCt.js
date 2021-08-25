const Picmain = require('mongoose').model('Picmain')
const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


module.exports = async(req, res, next) => {
	const { style } = req.params
	
	try{
		let carStyle = await fromRedis(`${cacheEnum.carsStyle}${style}`)

		// let carStyle = null
		if(!carStyle){
			carStyle = await Car.find({style:`${style}`})
			setDataInRedis(cacheEnum.carsStyle+style, JSON.stringify(carStyle))
		}

		const dataToReturn = {
			carsData: carStyle
		}
		
		res.send(dataToReturn)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
