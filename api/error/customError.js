exports.CustomError = class CustomError extends Error {
	

	constructor(message, status = 500, code, type) {
		super(message)
		this.status = status
		this.code = code
		this.type = type
	}

	getError() {
		return [{ 
			message: this.message, 
			status: this.status, 
			code: this.code
		}]
	}

	getStatus() {
		return this.status
	}

	getType() {
		return this.type
	}
}
