const AWS = require('aws-sdk')
const { prod, dev } = require('../services/secrets') 
// const uuid = require('uuid/v1')
// const crypto = require('crypto')
const isToken = require('../middleware/isToken')
const logger = require('../services/logger')

let ACCESS_KEY_ID = ''
let SECRET_ACCESS_KEY = ''
let BUCKET_NAME = ''
if(process.env.NODE_ENV === 'production'){
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

module.exports = app => {
	app.post('/upload', isToken, (req, res) => {

		const uid = Math.random().toString(36).split('.')[1].slice(0, 10)
		const namePic = JSON.parse(Object.keys(req.body)[0]).picture.toString()
		const section = JSON.parse(Object.keys(req.body)[0]).section.toString()

		let noSpaceName = ""
		for(let i=0; i < namePic.length; i++){
			if(namePic[i] !== " " && namePic[i] !== "/"){
				noSpaceName += namePic[i]
			}
		}
		
		const key = `${section}/${uid}${noSpaceName}`
		
		s3.getSignedUrl('putObject', {
			Bucket: BUCKET_NAME,
			ContentType: 'image/jpeg',
			Key: key
		}, (e, url) => {
			if(e){
				logger.error(`error from s3 upload route: ${e}`)
			}
			res.status(200).send({key, url})
		})
	})
}
