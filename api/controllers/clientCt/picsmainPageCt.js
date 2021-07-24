const Picmain = require('mongoose').model('Picmain')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


module.exports = async(req, res, next) => {
	try{

		let mainPicsData = await fromRedis(cacheEnum.mainPics)
		
		if(!mainPicsData) {
			mainPicsData = await Picmain.find() 
			setDataInRedis(cacheEnum.mainPics, JSON.stringify(mainPicsData))
		}
		
		res.send(mainPicsData)

	} catch(e) {
		// sett up the err !, use the already setted-up class 
		console.log('from front, req main: ', e)
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}		
}
