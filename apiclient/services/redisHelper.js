module.exports = (redisInstance, model) => {
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


