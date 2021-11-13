const Picstyle = require('mongoose').model('Picstyle')
const { encrypt, saveToken } = require('../../services/token')
const { ProcessError, ApiProcessError, ServerError } = require('../../error/listErrors')
const deleteHandler = require('../../services/deletePic')
const { picsStyleDelCache } = require('../../services/cache')
const logger = require('../../services/logger')

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
		logger.error(`adminCt picsstyleCt getPicsstyle: ${e}`)
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

		picsStyleDelCache(picStyleDeleted.style)

		res.redirect('/admin/picsstyle')
	} catch(e) {	
		logger.error(`adminCt picsstyleCt getDeletePicsstyle: ${e}`)
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
		logger.error(`adminCt picsstyleCt getChoicePicsstyle: ${e}`)
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
		logger.error(`adminCt picsstyleCt getModifyPicsstyle: ${e}`)
		next(new ServerError('A network error occured please try again'))
	}
}

// add data to db after pic has been saved, ajax req
exports.postAddPicsstyle = async(req, res, next) => {
	try{
		const dataToStore = JSON.parse(Object.keys(req.body)[0])
		if (dataToStore.picUrl) {
		
			const newPic = new Picstyle({
				style: dataToStore.style.toString(),
				pic: dataToStore.picUrl.toString()
			})
			await newPic.save()

			picsStyleDelCache(newPic.style)

			// the ajax request will redirect to the picsstyle page 
			res.status(200).send({ok:"saved"})	
			return
		}
		else throw Error(PICST_CT,' - picture url is missing')
	} catch(e) {
		logger.error(`adminCt picsstyleCt getAddPicsstyle: ${e}`)
		next(new ApiProcessError('A system error occured, please try again'))
	}
}

// modidy datas after edit
exports.postModifyPicsstyle = async(req, res, next) => {
	try{
		const picStyleToEdit = await Picstyle.findById(req.params.id)

		// delete previous style cache
		picsStyleDelCache(picStyleToEdit.style)

		picStyleToEdit.style = req.body.style.toString()
		await picStyleToEdit.save()

		// delete new style cache
		await picsStyleDelCache(req.body.style)

			
		res.redirect('/admin/picsStyle')
	} catch(e) {
		logger.error(`adminCt picsstyleCt postModifyPicsstyle: ${e}`)
		next(new ServerError('A network error occured please try again')) 
	}
}
