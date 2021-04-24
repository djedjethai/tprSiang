const Picstyle = require('mongoose').model('Picstyle')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError } = require('../../error/listErrors')
const deleteHandler = require('../../services/deletePic')

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
	res.render('tprmain/picsstyle', {
		pageTitle: 'picsstyle',
		path: '/picsstyle',
		pictures: arrayPics,
		editing: false
	})	
}

// delete one pic
exports.getDeletePicsstyle = async(req, res, next) => {
	try{
		const ID = req.params.id
		const indexToDelete = arrayPics.findIndex(rv => rv._id === ID)
		const urlArr = arrayPics[indexToDelete].pic.split('/')

		const d = await deleteHandler(urlArr)
		arrayPics.splice(indexToDelete, 1)
	
		res.redirect('/admin/picsstyle')
	} catch(e) {	
		next(new ProcessError('A system error occured during deleting the picture'))
	}
}

// access to choice a pic, set the token for auth
exports.getChoicePicsstyle = async(req, res, next) => {
	console.log('dans presignurl')
		
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try{
		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) {
			throw(new ProcessError('A system error occured, please try again.')) 
			return
		}

		res.render('tprmain/edit-picsstyle', {
			pageTitle: 'edit-picsstyle',
			path: '/edit-picsstyle',
			editing: false,
			token: hash
		})
	} catch(e) {
		next(e)
	}	
}

exports.getModifyPicsstyle = (req, res, next) => {
	const id = req.params.id
	
	const picture = arrayPics.filter(pic => pic._id === id)
	
	res.render('tprmain/edit-picsstyle', {
		pageTitle: 'edit-picsstyle',
		path: '/edit-picsstyle',
		editing: true,
		picture: picture[0]
	})
}

// add data to db after pic has been saved, ajax req
exports.postAddPicsstyle = (req, res, next) => {
	
	const dataToStore = JSON.parse(Object.keys(req.body)[0])

	if (dataToStore.picUrl) {
	
		const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
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

	next(new ApiProcessError('A system error occured, please try again'))
	// res.status(500).send({message:"An error occured, please try again"})
}

// modidy datas
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
