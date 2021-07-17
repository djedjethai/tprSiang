const redisInstance = require('./redisInstance')

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




// 
// // const redisPublisher = redisClient.duplicate()
// 
// 
// // ref to the prototype.exec func
// const exec = mongoose.Query.prototype.exec
// 
// mongoose.Query.prototype.exec = async function() {
//     	console.log('i am going to run a query')
//     
// 		// console.log(this.options.readPreference/writeConcern)
// 		console.log(this.op)
// 		// if(this.op !== 'find' && this.op !== 'findOne'){
// 		// 	console.log('DEL THE CAHCE')
// 		// }
// 		//console.log('grrr: ', this.query.op)
//     	console.log(this.getQuery())
//     	console.log(this.mongooseCollection.name)
//     	const queryContent = this.getQuery()
// 	const name = this.mongooseCollection.name
// 	
// 	console.log(Object.keys(queryContent).length)
//     	//redisClient.del('cars')
// 	
// 	// delete full collection/type
// 	// redisClient.del(this.mogooseCollection.name)
// 		
// 	//for now simple logic to delete full collection cache 
// 	//at update/delete/creation of a tupple of this collection
// 	// DOES NOT WORK AS WHEN GET COLLECTION, CONDITION IS TRUE
// 	if(Object.keys(queryContent).length === 0 && this.op !== 'find' && this.op !== 'findOne'){
// 		console.log('DELETE CACHE')
// 		redisClient.del(name)
// 
// 		// an idea of logic for single car cache
// 		// if(name === 'cars'){
// 		// 	const key = Object.assign({}, this.getQuery(), {
// 		// 		collection: this.mongooseCollection.name
// 		// 	})
// 		// 	redisClient.del(JSON.stringify(key))
// 		// }
// 	}
// 
//     	const result = await exec.apply(this, arguments)
// 		console.log('the resss: ',name +':::'+ result)
// 		return result
// }
// 
