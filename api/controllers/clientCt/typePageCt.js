const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')

module.exports = async(req, res, next) => {
	const { type } = req.params
	console.log('in server: ', type)

	try{
		let picsType = await fromRedis(`${cacheEnum.carsType}${type}`)

		if(!picsType){
			picsType = await Car.find({type: `${type}`})
			setDataInRedis(cacheEnum.carsType, JSON.stringify(picsType))
		}

		console.log(`pics type ${type} : `, picsType)
		
		res.send(`cars type ${type} pics`)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
