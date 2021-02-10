const Picstyle = require('mongoose').model('Picstyle')

const arrayPics = [
	{
		_id: "jjhbkj",
		style: "single",
		pic: "first one"
	},
	{
		_id: "gfds",
		style: "double",
		pic: "first two"
	},
	{
		_id: "ncvbv",
		style: "smart",
		pic: "first three"
	}
]

exports.getPicsstyle = (req, res, next) => {
	// query the pics style
	console.log(req.session)
	res.render('tprmain/picsstyle', {
		pageTitle: 'picsstyle',
		path: '/picsstyle',
		pictures: arrayPics,
		editing: false
	})	
}

exports.getDeletePicsstyle = (req, res, next) => {
	// req to get all pics 
	console.log(req.params.id)
	const ID = req.params.id

	const indexToDelete = arrayPics.findIndex(rv => rv._id === ID)
	arrayPics.splice(indexToDelete, 1)
	res.redirect('/admin/picsstyle')
}

exports.getPresignurlPicsstyle = (req, res, next) => {
	console.log('dans presignurl')
	// logique with aws to get presign url
	// then send it to ejs page 
	// here take this url for testing, 
	const presignUrl = 'http://localhost:3050/admin/add-picsstyle'
	res.render('tprmain/edit-picsstyle', {
		pageTitle: 'edit-picsstyle',
		path: '/edit-picsstyle',
		editing: false,
		presignUrl: presignUrl
	})
}

exports.getModifyPicsstyle = (req, res, next) => {
	const id = req.params.id
	console.log('dans modif picsstyle: ', id)
	
	const picture = arrayPics.filter(pic => pic._id === id)
	console.log('pic to midify: ', picture)
	
	res.render('tprmain/edit-picsstyle', {
		pageTitle: 'edit-picsstyle',
		path: '/edit-picsstyle',
		editing: true,
		picture: picture[0]
	})
}


exports.postAddPicsstyle = (req, res, next) => {
	// req to get all pics
	console.log('dans postAddPics')

	console.log(req.session)

		
	// temporary conditon as i use this route to simulate the s3Bucket url
	 if (req.body.style) {
	 	// at this point, pic has been saved in s3 bucket, 
	 	// here we save the url and the syle in db
	
		const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
		console.log('the style: ', req.body.style)
		const newPic = {
			_id: id,
			style: req.body.style,
			url: req.body.picUrl
		}
		
		arrayPics.push(newPic)
		// the ajax request will redirect to the picsstyle page 
		res.status(200).send({ok:"saved"})
		
		return
	}

	// set logic to save in db picture url (which have been already saved in S3 bucket)
	
	res.status(200).send({ok:"ok"})
}

exports.postModifyPicsstyle = (req, res, next) => {

	const indexPicToModif = arrayPics.findIndex(pic => pic._id === req.params.id)
	arrayPics[indexPicToModif].style = req.body.style
	
	res.render('tprmain/picsstyle', {
		pageTitle: 'picsstyle',
		path: '/picsstyle',
		pictures: arrayPics,
		editing: false
	})	
}
