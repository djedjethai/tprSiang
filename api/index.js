const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')



// const authRouter = require('./routes/adminRt/authRt')
const { errorHandler } = require('./middleware/errorHandler')

const keys = require('./config/keys')

const app = express()


app.use(bodyParser.urlencoded({ extended: false }))

// app.use(express.static(path.join(__dirname, 'tmp')));

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	res.setHeader('Access-Control-Allow-Methods','GET, POST')
	res.setHeader('Access-Control-Allow-Headers','Content-Type, application/x-www-form-urlencoded')
	res.setHeader('Access-Control-Allow-Headers','Content-Type, application/json')
	// res.setHeader('Content-Type', 'application/json');
	next()
})

const User = require('./models/User')
require('./models/Car')
require('./models/Picmain')
require('./models/Picstyle')
require('./models/Review')

const cache = require('./services/cache')

app.set('view engine', 'ejs')
app.set('views', 'views')

// various routes to manage account')
// app.use(authRouter)

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: keys.secretSession,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true
  })  
}))

// admin routes
require('./routes/adminRt/authRt')(app)
require('./routes/adminRt/carsRt')(app)
require('./routes/adminRt/picsmainRt')(app)
require('./routes/adminRt/picsstyleRt')(app)
require('./routes/adminRt/reviewsRt')(app)
require('./routes/uploadRoutes')(app)

// client routes
require('./routes/clientRt/routes')(app)

app.use((req, res, next) => {
	if(!req.session.user) return next()
	
	// we check if admin is in the session
	User.findById(req.session.user._id)
		.then(user => {
			if(!user) return next()

			req.user = user
			next()
		})
		.catch(e => next(new Error(e)))
})


app.use(errorHandler)

module.exports = app


