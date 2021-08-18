const Picmain = require('mongoose').model('Picmain')
const Car = require('mongoose').model('Car')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


module.exports = async(req, res, next) => {
	const { style } = req.params
	const {styleid } = req.query
	
	console.log('the style: ', style)
	console.log('the id: ', styleid)

	try{
		let [car, picsStyle] = await Promise.all([
			fromRedis(`${cacheEnum.car}${styleid}`),
			fromRedis(`${cacheEnum.picsStyle}${style}`)
		])

		if(!car) {
			carData = await Car.find({_id: styleid}) 
			setDataInRedis(cacheEnum.car+styleid, JSON.stringify(carData))
		}

		if(!picsStyle){
			picsStyle = await Car.find({style:`${style}`})
			setDataInRedis(cacheEnum.picsStyle+style, JSON.stringify(picsStyle))
		}

		const dataToReturn = {
			carSelected: car,
			carsData: picsStyle
		}
		
		console.log('oook: ', dataToReturn)

		res.send(dataToReturn)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
