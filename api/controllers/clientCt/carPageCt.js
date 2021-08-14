const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


module.exports = async(req, res, next) => {
	const { id } = req.params

	try{
		let car = await fromRedis(`${cacheEnum.car}${id}`)

		if(!car){
			car = await Car.find({_id: id})
			setDataInRedis(cacheEnum.car+id, JSON.stringify(car))
		}

		const dataToReturn = {
			carsData: car
		}
		
		res.send(dataToReturn)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
