const { CustomError } = require('./customError')


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
class ApiProcessError extends CustomError { 
	constructor(message){ super(message, 417, 'PROCESS_ERROR', 'API') 
}}



module.exports = { AuthError, BadReqError, ServerError, ProcessError, ApiProcessError }
