const { promisify } = require('util')

const AWS = require('aws-sdk')
const keys = require('../config/keys') 

const s3 = new AWS.S3({
	accessKeyId: keys.accessKeyId,
	secretAccessKey: keys.secretAccessKey
})

module.exports = (urlArr) => {
	const s3keypic = `${urlArr[urlArr.length - 2]}/${urlArr[urlArr.length - 1]}`
	const params ={
		Bucket:'node-advance-course',
		Key:s3keypic
	}
	return new Promise((resolve, reject) => {
		s3.deleteObject(params, (e,d) => {
			if(e) reject(e)
			else resolve(true)
		})
	})
}

// const s3 = new AWS.S3({
		// 	accessKeyId: keys.accessKeyId,
		// 	secretAccessKey: keys.secretAccessKey
		// })

		// const params = {
		// 	Bucket:'node-advance-course',
		// 	Key:s3keypic
		// }
		// s3.deleteObject(params, function(e,d) {
		// 	if(e) console.log('err delete obj: ', e)
		// 	else console.log('obj deleted ??: ', d)
		// })	

