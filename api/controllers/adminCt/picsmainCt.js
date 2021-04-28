const Picmain = require('mongoose').model('Picmain')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError, ServerError } = require('../../error/listErrors')
const deleteHandler = require('../../services/deletePic')


// const AWS = require('aws-sdk')
// const keys = require('../../config/keys') 


// get all pics
exports.getPicsmain = async(req, res, next) => {
	try{
		const picsMain = await Picmain.find()

		res.render('tprmain/picsmain', {
			pageTitle: 'picsmain',
			path: '/picsmain',
			pictures: picsMain	
		})
	} catch(e) {
		next(new ServerError('A network error occured please try again'))
	}
}

// delete selected picture
exports.getDeletePicsmain = async(req, res, next) => {
	// req to get all pics 
	try{
		const ID = req.params.id
		const picMainDeleted = await Picmain.findByIdAndDelete({_id:ID})
		
		const urlArr = picMainDeleted.pic.split('/')
		// delete pic in s3 bucket
		const d = await deleteHandler(urlArr)
		if(!d) throw Error()
		
		res.redirect('/admin/picsmain')
	} catch(e) {
		next(new ProcessError('A system error occured during deleting the picture'))
	}	
}

// access to the page to select a picture, and add a token for ajax req's authentification
exports.getChoicePicsmain = async(req, res, next) => { 
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try{
		
		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) throw Error()

		res.render('tprmain/edit-picsmain', {
			pageTitle: 'edit-picsmain',
			path: '/edit-picsmain',
			token: hash
		})
	
	} catch(e) {
		next(new ProcessError('A system error occured, please try again'))
	}
}

// add data into db. from ajax req
exports.postAddPicsmain = async(req, res, next) => {
	try{
		const dataToStore = JSON.parse(Object.keys(req.body)[0])

		if (dataToStore.picUrl) {
			const newPic = new Picmain({
				pic: dataToStore.picUrl
			})
			await newPic.save()
			
			res.status(200).send({ok:"saved"})
			return
		}
	} catch(e) {
		next(new ApiProcessError('A system error occured, please try again'))
	}
}
