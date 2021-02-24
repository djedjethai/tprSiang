const Picmain = require('mongoose').model('Picmain')
const fs = require('fs')
const { promisify } = require('util')
const bcrypt = require('bcryptjs');

const arrayPics = [
	{
		_id: "jjhbkj",
		pic: "first one"
	},
	{
		_id: "gfds",
		pic: "first two"
	},
	{
		_id: "ncvbv",
		pic: "first three"
	}
]


exports.getPicsmain = (req, res, next) => {
	// req to get all pics 
	console.log(req.session)
	res.render('tprmain/picsmain', {
		pageTitle: 'picsmain',
		path: '/picsmain',
		pictures: arrayPics	
	})
}

exports.getDeletePicsmain = (req, res, next) => {
	// req to get all pics 
	console.log(req.params.id)
	const ID = req.params.id

	const indexToDelete = arrayPics.findIndex(rv => rv._id === ID)
	arrayPics.splice(indexToDelete, 1)
	res.redirect('/admin/picsmain')
}

exports.getPresignurlPicsmain = async(req, res, next) => {
	console.log('dans presignurl')

	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try{

		const saltRounds = 10;
		const myPlaintextPassword = 'jerome';
		const salt =  await bcrypt.genSalt(saltRounds)
        	const hash =  await bcrypt.hash(token, salt) 	

		const print = (e,d) => {
			if(e) throw Error(e)
			else return d
		}

		// create file to save the token && save the token
		const fd = await promisify((print) => fs.open('/opt/app/tmp/token.txt', 'w', print))()
  		await promisify((print) => fs.appendFile(fd, token, 'utf8', print))()
        	fs.close(fd, err => { if(err) throw Error('error in close: ', err) } )
		
			
		// logique with aws to get presign url
		// then send it to ejs page 
		// here take this url for testing, 
		const presignUrl = 'http://localhost:3050/admin/add-picsmain'
		res.render('tprmain/edit-picsmain', {
			pageTitle: 'edit-picsmain',
			path: '/edit-picsmain',
			token: hash
		})
	
	} catch(e) {
		console.error(e)
	}

}


exports.postAddPicsmain = (req, res, next) => {
	// req to get all pics
	console.log('dans postAddPics')

	console.log('the body de fouuu: ', req.body)
	
	// set logic to save in db picture url (which have been already saved in S3 bucket)
	// temporary set this condition as this path simulate the s3Bucker path
	if (req.body.picUrl) {
	 	// at this point, pic has been saved in s3 bucket, 
	 	// here we save the url in db
	
		const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
		console.log('the style: ', req.body.style)
		const newPic = {
			_id: id,
			url: req.body.picUrl
		}
		
		arrayPics.push(newPic)
		// the ajax request will redirect to the picsstyle page 
		res.status(200).send({ok:"saved"})
		
		return
	}

	
	res.status(200).send({ok:"ok"})
}
