const { CustomError } = require('../error/customError')

exports.errorHandler = (err, req, res, next) => {

	if(err instanceof CustomError) {
		if(err.getType() === 'EJS') {
			const message = err.getError()[0].message
			res.render('tprmain/reporterrpage', {
				pageTitle: 'reporterrpage',
				path: '/reporterrpage',
				errReport: message	
			})
		}

		if(err.getType() === 'API') {
			// console.log('in err handler: ', err.getError())
			res.status(err.getStatus()).send({errors: err.getError()})
		}
	}
	else {
		console.log(err)
	}
}



