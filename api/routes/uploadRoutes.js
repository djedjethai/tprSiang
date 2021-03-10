const AWS = require('aws-sdk')
const keys = require('../config/keys') 
// const uuid = require('uuid/v1')
// const crypto = require('crypto')
const isToken = require('../middleware/isToken')

const s3 = new AWS.S3({
	accessKeyId: keys.accessKeyId,
	secretAccessKey: keys.secretAccessKey
})


module.exports = app => {
	app.post('/upload', isToken, (req, res) => {

		const uid = Math.random().toString(36).split('.')[1].slice(0, 10)
		const namePic = JSON.parse(Object.keys(req.body)[0]).picture
		const section = JSON.parse(Object.keys(req.body)[0]).section
		const key = `${section}/${uid}${namePic}`
		// console.log(key)
		
		s3.getSignedUrl('putObject', {
			Bucket: 'node-advance-course',
			ContentType: 'image/jpeg',
			Key: key
		}, (e, url) => {
			// console.log('the url from s3: ', url)
			res.status(200).send({key, url})
		})
	})
}
