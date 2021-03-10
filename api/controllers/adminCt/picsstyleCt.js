const Picstyle = require('mongoose').model('Picstyle')
const { encrypt, saveToken } = require('../../services/token')

const arrayPics = [
	{
		_id: "jjhbkj",
		style: "Single",
		pic: "first one"
	},
	{
		_id: "gfds",
		style: "Double",
		pic: "first two"
	},
	{
		_id: "ncvbv",
		style: "Smart",
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

exports.getChoicePicsstyle = async(req, res, next) => {
	console.log('dans presignurl')
		
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try{
		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) {
			throw(new Error('err during token saving process')) 
			return
		}

		res.render('tprmain/edit-picsstyle', {
			pageTitle: 'edit-picsstyle',
			path: '/edit-picsstyle',
			editing: false,
			token: hash
		})
	} catch(e) {
		console.error(e)
	}	
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
	
	const dataToStore = JSON.parse(Object.keys(req.body)[0])

		
	// temporary conditon as i use this route to simulate the s3Bucket url
	 if (dataToStore.picUrl) {
	 	// at this point, pic has been saved in s3 bucket, 
	 	// here we save the url and the syle in db
	
		const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
		console.log('the style: ', dataToStore.style)
		const newPic = {
			_id: id,
			style: dataToStore.style,
			pic: dataToStore.picUrl
		}
		
		arrayPics.push(newPic)
		console.log('final datas stored', arrayPics)
		// the ajax request will redirect to the picsstyle page 
		res.status(200).send({ok:"saved"})
		
		return
	}

	// set logic to save in db picture url (which have been already saved in S3 bucket)
	
	res.status(500).send({message:"An error occured, please try again"})
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
