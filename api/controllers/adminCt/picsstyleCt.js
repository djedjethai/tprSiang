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
	
	const picture = arrayPics.select(pic => pic._id === id)
	console.log('pic to midify: ', picture)
	
	res.render('tprmain/edit-picsstyle', {
		pageTitle: 'edit-picsstyle',
		path: '/edit-picsstyle',
		editing: true,
		picture: picture
	})
}


exports.postAddPicsstyle = (req, res, next) => {
	// req to get all pics
	console.log('dans postAddPics')

	console.log(req.session)

	if (req.body) {
		// const urls3B = req.body
		const url = {
			style: req.body.style,
			url: req.body.picUrl
		}
		console.log(url)
	}
	
	// set logic to save in db picture url (which have been already saved in S3 bucket)
	
	res.status(200).send({ok:"ok"})
}

exports.postModifyPicsstyle = (req, res, next) => {
	console.log('in post midifPiscctyle')
	console.log(req.body)
}
