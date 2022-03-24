const logger = require('../../services/logger')
const { prod, dev } = require('../../services/secrets')
const { AuthError } = require('../../error/listErrors')
const { setDataInRedis, cacheEnum } = require('../../services/cache')
const { encrypt, saveToken, verify } = require('../../services/token') 

let ADMIN = ''
let PASSWORD_ADMIN = ''
if(process.env.NODE_ENV === 'production'){
	ADMIN = prod(process.env.ADMIN)
	PASSWORD_ADMIN = prod(process.env.PASSWORD_ADMIN)
} else {
	ADMIN = dev('ADMIN')
	PASSWORD_ADMIN = dev('PASSWORD_ADMIN')
}

exports.getSignin = async(req, res, next) => {
    		
	// const passwordEnc = await encrypt('thePassword')
	// console.log("passEncoded: ", passwordEnc)

	res.render('auth/signin', {
        	pageTitle: 'signInForm',
       	 	path: '/signin',
        	editing: false,
        	test: 'alors',
        	errorDetails: ''
    	});
}

exports.postSignin = async (req, res, next) => {	
    	const user = req.body.name
	const password = req.body.password

	if (!password || (user !== ADMIN)) {
		logger.error(`auth signin ${password} or ${user} are incorrect`)
		res.redirect('/admin/getsignin')
		return
	}

	try {
		// const match = await bcrypt.compare(password, PASSWORD_ADMIN)
		const match = await verify(password, PASSWORD_ADMIN)

		if(match) {
			//login 
			req.session.isLoggedIn = true
			req.session.user = user
			
			res.redirect('/admin/cars')
			return
					}
		else{	
			throw new AuthError('password incorrect')
		}
	}
	catch(e) {
		logger.error(`err when bcrypt compare password: ${e}`)
		next(e)
		return
	}
}

exports.getLogout = async (req, res, next) => {
	// create a new token and save it to redis, 
	// for the standbye stored token to be unknow from anyone
	try{
		const token = Math.random().toString(36).split('.')[1].slice(0, 10)
		const tokenSaved = await saveToken(token)
		if(!tokenSaved) throw Error('getLogout - token is not save')
	} catch(e) {
		logger.error(`getLogout new token for stadbye err: ${e}`)	
	}	

	req.session.destroy(err => {
		res.redirect('/admin/getsignin')
	})
}
