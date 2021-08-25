const Car = require('mongoose').model('Car')
const Picstyle = require('mongoose').model('Picstyle')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


module.exports = async(req, res, next) => {
	const { id } = req.params
	const { style } = req.query

	console.log("the style de ouff: ", style)

	try{
		let [car, carPicStyle] = await Promise.all([
			fromRedis(`${cacheEnum.car}${id}`),
			fromRedis(`${cacheEnum.picsStyle}${style}`)
		])
		// let car = await fromRedis(`${cacheEnum.car}${id}`)
		// let carPicStyle = await fromRedis(`${cacheEnum.picsStyle}${style}`)

		if(!car){
			car = await Car.find({_id: id})
			setDataInRedis(cacheEnum.car+id, JSON.stringify(car))
		}

		// let carPicStyle = null
		console.log("cache from picsStyle bug??: ", carPicStyle)
		if(!carPicStyle){
			carPicStyle = await Picstyle.find({style: style})
			setDataInRedis(cacheEnum.picsStyle+style, JSON.stringify(carPicStyle))
		}

		const dataToReturn = {
			carsData: car,
			picsStyle: carPicStyle
		}

		console.log("the datas from ouuuf: ", dataToReturn)

		res.send(dataToReturn)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
