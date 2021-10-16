const redisInstance = require('./redisInstance')
const logger = require('./logger')

const cacheEnum = Object.freeze({
	mainPics: "mainpics", 
	mainCars: "maincar",
	mainReviews: "mainreview",
	reviews: "reviews", 
	carsType: "carstype-",
	carsStyle: "carsstyle-",
	car: "car-",
	picsStyle: "picsstyle-"
})

function deleteCache(name, spec=""){
	redisInstance.getInstance().del(`${name}${spec}`)
}

function carDelCache(cchType, cchStyle, cchCarId=""){
	deleteCache(cacheEnum.mainCars)
	deleteCache(cacheEnum.carsType, cchType)
	deleteCache(cacheEnum.carsStyle, cchStyle)
	deleteCache(cacheEnum.car, cchCarId)
}

function reviewDelCache(){
	deleteCache(cacheEnum.mainReviews)
	deleteCache(cacheEnum.reviews)
}

function picsMainDelCache(){
	deleteCache(cacheEnum.mainPics)
}

function picsStyleDelCache(cchStyle){
	deleteCache(cacheEnum.picsStyle, cchStyle)
}

function fromRedis(model){
	return new Promise((resolve, reject) => {
		redisInstance.getInstance().get(model, (err, val) => {
			if(err){
				logger.error(`reject in fromRedis return Promise: ${err}`)
				reject(err)
			}
			const dts = JSON.parse(val)
			resolve(dts)
		})
	})	
}

function setDataInRedis(cacheName, datas){
	redisInstance.getInstance().set(cacheName, datas, 'EX', 3600)
}

module.exports = { 
	carDelCache, 
	reviewDelCache,
	picsMainDelCache,
	picsStyleDelCache,
	fromRedis, 
	setDataInRedis, 
	cacheEnum 
}

