const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')
const translator = require('../../services/translator')

module.exports = async(req, res, next) => {
	const { type } = req.params
	
	// transalte from eng to thai
	const data = translator(type)

	try{
		let picsType = await fromRedis(`${cacheEnum.carsType}${data}`)

		if(!picsType){
			picsType = await Car.find({type: `${data}`})
			setDataInRedis(cacheEnum.carsType+data, JSON.stringify(picsType))
		}

		console.log(`pics type ${type} : `, picsType)
		
		res.send(`cars type ${type} pics`)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
