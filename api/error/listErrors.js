const { CustomError } = require('./customError')

// ejs err as it's link to the session
class AuthError extends CustomError { 
	constructor(message){ super(message, 401, 'AUTH_ERROR', 'EJS') 
}}

class BadReqError extends CustomError { 
	constructor(message){ super(message, 400, 'BAD_REQ_ERROR', 'EJS') 
}}

class ServerError extends CustomError { 
	constructor(message){ super(message, 500, 'SERVER_ERROR', 'EJS') 
}}

class ProcessError extends CustomError { 
	constructor(message){ super(message, 417, 'PROCESS_ERROR', 'EJS') 
}}

// api err as it's a Restfull json service
// will also handle the admin's Ajax requests
class ApiProcessError extends CustomError { 
	constructor(message){ super(message, 417, 'PROCESS_ERROR', 'API') 
}}

class ApiServerError extends CustomError { 
	constructor(message){ super(message, 500, 'SERVER_ERROR', 'API') 
}}



module.exports = { 
	AuthError, 
	BadReqError, 
	ServerError, 
	ProcessError, 
	ApiProcessError,
	ApiServerError
}
