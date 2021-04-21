const Picmain = require('mongoose').model('Picmain')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError, ServerError } = require('../../error/listErrors')
const deleteHandler = require('../../services/deletePic')


const AWS = require('aws-sdk')
const keys = require('../../config/keys') 

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

// get all pics
exports.getPicsmain = (req, res, next) => {
	console.log(req.session)
	res.render('tprmain/picsmain', {
		pageTitle: 'picsmain',
		path: '/picsmain',
		pictures: arrayPics	
	})
}

// delete one pic
exports.getDeletePicsmain = async(req, res, next) => {
	// req to get all pics 
	try{
		const ID = req.params.id
		const indexToDelete = arrayPics.findIndex(rv => rv._id === ID)
		const urlArr = arrayPics[indexToDelete].pic.split('/')

		const d = await deleteHandler(urlArr)
		arrayPics.splice(indexToDelete, 1)
		
		res.redirect('/admin/picsmain')
	} catch(e) {
		console.log('an err occ in the delete pic')
		next(new ProcessError('A system error occured during deleting the picture'))
	}	
}

// access to the page to select a picture, join token for auth
exports.getChoicePicsmain = async(req, res, next) => { 
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try{

		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) {
			throw new ProcessError('A system error occured, please retry.')
			return
		}

		res.render('tprmain/edit-picsmain', {
			pageTitle: 'edit-picsmain',
			path: '/edit-picsmain',
			token: hash
		})
	
	} catch(e) {
		next(e)
	}
}

// add data into db. from ajax req
exports.postAddPicsmain = (req, res, next) => {

	const dataToStore = JSON.parse(Object.keys(req.body)[0])

	if (dataToStore.picUrl) {
		const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
		console.log('the style: ', req.body.style)
		const newPic = {
			_id: id,
			pic: dataToStore.picUrl
		}
		
		arrayPics.push(newPic)

		// the ajax request will redirect to the picsstyle page 
		// if ok from db 
		res.status(200).send({ok:"saved"})
		// else throw ServerError


		return
	}

	next(new ApiProcessError('A system error occured, please try again'))
	return
	// res.status(500).send({message:"An error occured, please try again"})
}
