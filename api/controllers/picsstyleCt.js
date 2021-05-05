const Picstyle = require('mongoose').model('Picstyle')
const { encrypt, saveToken } = require('../services/token')
const { ProcessError, ApiProcessError, ServerError } = require('../error/listErrors')
const deleteHandler = require('../services/deletePic')

const PICST_CT = 'picsstyleCt.js'

exports.getPicsstyle = async(req, res, next) => {
	try{
		const picsStyle = await Picstyle.find()

		res.render('tprmain/picsstyle', {
			pageTitle: 'picsstyle',
			path: '/picsstyle',
			pictures: picsStyle,
			editing: false
		})
	} catch(e) {
		next(new ServerError('A network error occured please try again'))
	}
}

// delete a selected picStyle
exports.getDeletePicsstyle = async(req, res, next) => {
	try{
		const ID = req.params.id
		const picStyleDeleted = await Picstyle.findOneAndDelete({_id:ID})

		const urlArr = picStyleDeleted.pic[0].split('/')
		// delete the pic in s3 bucket
		const d = await deleteHandler(urlArr)
		if(!d) throw Error(PICST_CT,' - deleting s3 has a problem')

		res.redirect('/admin/picsstyle')
	} catch(e) {	
		next(new ProcessError('A system error occured during deleting the picture'))
	}
}

// access to choice a pic, set the token for auth
exports.getChoicePicsstyle = async(req, res, next) => {
	try{
		const token = Math.random().toString(36).split('.')[1].slice(0, 10)
		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) throw Error(PICST_CT,' - token is not save') 

		res.render('tprmain/edit-picsstyle', {
			pageTitle: 'edit-picsstyle',
			path: '/edit-picsstyle',
			editing: false,
			token: hash
		})
	} catch(e) {
		next(new ProcessError('A system error occured, please try again'))
	}	
}

// get the pic's style datas to modify/edit it
exports.getModifyPicsstyle = async(req, res, next) => {
	try{
		const id = req.params.id
		const picStyleToEdit = await Picstyle.findById(id)
		
		res.render('tprmain/edit-picsstyle', {
			pageTitle: 'edit-picsstyle',
			path: '/edit-picsstyle',
			editing: true,
			picture: picStyleToEdit
		})
	} catch(e) {
		next(new ServerError('A network error occured please try again'))
	}
}

// add data to db after pic has been saved, ajax req
exports.postAddPicsstyle = async(req, res, next) => {
	try{
		const dataToStore = JSON.parse(Object.keys(req.body)[0])
		if (dataToStore.picUrl) {
		
			const newPic = new Picstyle({
				style: dataToStore.style,
				pic: dataToStore.picUrl
			})
			await newPic.save()

			// the ajax request will redirect to the picsstyle page 
			res.status(200).send({ok:"saved"})	
			return
		}
		else throw Error(PICST_CT,' - picture url is missing')
	} catch(e) {
		next(new ApiProcessError('A system error occured, please try again'))
	}
}

// modidy datas after edit
exports.postModifyPicsstyle = async(req, res, next) => {
	try{
		const picStyleToEdit = await Picstyle.findById(req.params.id)
		picStyleToEdit.style = req.body.style

		await picStyleToEdit.save()
	
		res.redirect('/admin/picsStyle')
	} catch(e) {
		next(new ServerError('A network error occured please try again')) 
	}
}
