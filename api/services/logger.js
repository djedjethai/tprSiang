const { createLogger, format, transports } = require('winston');

module.exports = createLogger({
	transports:[
	    	new transports.File({
			filename: 'logs/combined.log',	
	    		format:format.combine(
	        		format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
	        		format.align(),
	        		format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
	    		)}
		),
		new transports.File({
	    		filename: 'logs/error.log',
			level: 'error',
	    		format:format.combine(
	        		format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
	        		format.align(),
	        		format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
	    		)}
		),
	]
});



