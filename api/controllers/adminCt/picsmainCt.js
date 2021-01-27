const Picmain = require('mongoose').model('Picmain')

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

exports.getPresignurlPicsmain = (req, res, next) => {
	console.log('dans presignurl')
	// logique with aws to get presign url
	const presignUrl = 'http://localhost:3050/admin/add-picsmain'
	res.render('tprmain/edit-picsmain', {
		pageTitle: 'edit-picsmain',
		path: '/edit-picsmain',
		presignUrl: presignUrl
	})
}


exports.postAddPicsmain = (req, res, next) => {
	// req to get all pics
	console.log('dans postAddPics')

	console.log(req.session)

	console.log(req.file)
	// const newPicture = {
	// 	_id: "jhgejhfds",
	// 	picture: nc.picture,
	// }
	// // console.log(req.body)
	// arrayPics.push(newPicture)
	// res.redirect('/admin/reviews')
}
