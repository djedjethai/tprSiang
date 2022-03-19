const { promisify } = require('util')

const AWS = require('aws-sdk')
const {prod, dev} = require('./secrets') 
const logger = require('./logger')

let ACCESS_KEY_ID = ''
let SECRET_ACCESS_KEY = ''
let BUCKET_NAME = ''
if(process.env.NODE_ENV === "production"){
	ACCESS_KEY_ID = prod(process.env.ACCESS_KEY_ID)
	SECRET_ACCESS_KEY = prod(process.env.SECRET_ACCESS_KEY)
	BUCKET_NAME = prod(process.env.BUCKET_NAME)
} else {
	ACCESS_KEY_ID = dev('ACCESS_KEY_ID')
	SECRET_ACCESS_KEY = dev('SECRET_ACCESS_KEY')
	BUCKET_NAME = dev('BUCKET_NAME')
}

const s3 = new AWS.S3({
	accessKeyId: ACCESS_KEY_ID,
	secretAccessKey: SECRET_ACCESS_KEY
})

module.exports = (urlArr) => {
	const s3keypic = `${urlArr[urlArr.length - 2]}/${urlArr[urlArr.length - 1]}`
	const params ={
		Bucket: BUCKET_NAME,
		Key:s3keypic
	}
	return new Promise((resolve, reject) => {
		s3.deleteObject(params, (e,d) => {
			if(e){
				logger.error(`reject when s3 deleteObject from bucket: ${e}`)
				reject(e)
			}
			else resolve(true)
		})
	})
}


