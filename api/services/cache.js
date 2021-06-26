const redisInstance = require('./redisInstance')

const cacheEnum = Object.freeze({
	mainPics: "mainpics", 
	mainCarReview: "maincarreview",
	reviews: "reviews", 
	carsType: "carstype-",
	carsStyle: "carsstyle-",
	car: "car-",
	picsStyle: "picsstyle-"
})

function deleteCache(name, spec=""){
	redisInstance.getInstance().del(`${name}${spec}`)
}

function carDelCache(cchType, cchStyle){
	deleteCache(cacheEnum.mainCarReview)
	deleteCache(cacheEnum.carsType, cchType)
	deleteCache(cacheEnum.carsStyle, cchStyle)
}

module.exports = { carDelCache }



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