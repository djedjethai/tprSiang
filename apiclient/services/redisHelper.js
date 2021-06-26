const fromRedis = (redisInstance, model) => {
	return new Promise((resolve, reject) => {
		redisInstance.get(model, (err, val) => {
			if(err){
				reject(err)
			}
			const dts = JSON.parse(val)
			resolve(dts)
		})
	})	
}

const cacheEnum = Object.freeze({
	mainPics: "mainpics", 
	mainCarReview: "maincarreview",
	reviews: "reviews", 
	carsType: "carstype-",
	carsStyle: "carsstyle-",
	car: "car-",
	picsStyle: "picsstyle-"
})

module.exports = { fromRedis, cacheEnum }
