const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')

const { errorHandler } = require('./middleware/errorHandler')

const { prod, dev } = require('./services/secrets')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	res.setHeader('Access-Control-Allow-Methods','GET, POST')
	res.setHeader('Access-Control-Allow-Headers','Content-Type, application/x-www-form-urlencoded')
	next()
})

require('./models/Car')
require('./models/Picmain')
require('./models/Picstyle')
require('./models/Review')

// const cache = require('./services/cache')

app.set('view engine', 'ejs')
app.set('views', 'views')


let SESSION_SECRET = ''
process.env.NODE_ENV === "production" ? 
	SESSION_SECRET = prod(process.env.SESSION_SECRET) : 
	SESSION_SECRET = dev('SESSION_SECRET')

const sessionHandler = session({
  resave: true,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true
  })  
})

const sessionPaths = ['/main', '/type/*', '/style/*', '/car/*', '/reviewsClient'];
app.use(function(req, res, next){
	if (!sessionPaths.includes(req.path)){
		return sessionHandler(req, res, next) 
		next()
	} else {
		next()
	}
})

// admin routes
require('./routes/adminRt/authRt')(app)
require('./routes/adminRt/carsRt')(app)
require('./routes/adminRt/picsmainRt')(app)
require('./routes/adminRt/picsstyleRt')(app)
require('./routes/adminRt/reviewsRt')(app)
require('./routes/uploadRoutes')(app)

// client routes
require('./routes/clientRt/routes')(app)

app.use(errorHandler)

module.exports = app


