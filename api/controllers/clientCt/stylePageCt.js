const Picstyle = require('mongoose').model('Picstyle')
const { fromRedis, cacheEnum, setDataInRedis } = require('../../services/cache')
const { ApiServerError } = require('../../error/listErrors')


module.exports = async(req, res, next) => {
	const { style } = req.params
	
	try{
		let picsStyle = await fromRedis(`${cacheEnum.picsStyle}${style}`)
		
		if(!picsStyle){
			picsStyle = await Picstyle.find({style:`${style}`})
			setDataInRedis(cacheEnum.picsStyle+style, JSON.stringify(picsStyle))
		}

		console.log(`pics style ${style} : `, picsStyle)
		
		res.send(`cars style ${style} pics`)

	} catch(e) {
		next(new ApiServerError('An unexpected server error occured, please try again'))
	}
}
