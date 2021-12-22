const AWS = require('aws-sdk')
const keys = require('../config/keys') 
// const uuid = require('uuid/v1')
// const crypto = require('crypto')
const isToken = require('../middleware/isToken')
const logger = require('../services/logger')

const s3 = new AWS.S3({
	accessKeyId: keys.accessKeyId,
	secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
	app.post('/upload', isToken, (req, res) => {

		const uid = Math.random().toString(36).split('.')[1].slice(0, 10)
		const namePic = JSON.parse(Object.keys(req.body)[0]).picture.toString()
		const section = JSON.parse(Object.keys(req.body)[0]).section.toString()

		let noSpaceName = ""
		for(let i=0; i < namePic.length; i++){
			if(namePic[i] !== " "){
				noSpaceName += namePic[i]
			}
		}
		
		const key = `${section}/${uid}${noSpaceName}`
		
		s3.getSignedUrl('putObject', {
			Bucket: keys.bucketName,
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
