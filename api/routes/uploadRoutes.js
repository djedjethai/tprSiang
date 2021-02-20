const AWS = require('aws-sdk')
const keys = require('../config/keys') 
const uuid = require('uuid/v1')

const s3 = new AWS.S3({
	accessKeyId: keys.accessKeyId,
	secretAccessKey: keys.secretAccessKey
})

module.exports = app => {
	app.get('/api/upload/:id', (req, res) => {
		const key = `${req.params.id}/${uuid()}/.jpeg`
		s3.getSignedUrl('putObject', {
			Bucket: 'node-advance-course',
			ContentType: 'jpeg',

		})
	})
}
