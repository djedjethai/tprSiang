const Picmain = require('mongoose').model('Picmain')
const { encrypt, saveToken } = require('../../services/token')

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

exports.getChoicePicsmain = async(req, res, next) => { 
	// random token stronger... ???
	const token = Math.random().toString(36).split('.')[1].slice(0, 10)
	try{

		const hash = await encrypt(token)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) {
			throw(new Error('err during token saving process')) 
			return
		}

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

	const dataToStore = JSON.parse(Object.keys(req.body)[0])
	// console.log('the body de fouuu: ', dataToStore)

	// store new data to db
	if (dataToStore.picUrl) {
		const id = Math.random().toString(36).split('.')[1].slice(0, 4)	
		console.log('the style: ', req.body.style)
		const newPic = {
			_id: id,
			pic: dataToStore.picUrl
		}
		
		arrayPics.push(newPic)

		// the ajax request will redirect to the picsstyle page 
		res.status(200).send({ok:"saved"})
		
		return
	}

	
	res.status(500).send({message:"An error occured, please try again"})
}
