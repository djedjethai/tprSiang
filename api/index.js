const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const { errorHandler } = require('./middleware/errorHandler')
// const cors = require('cors')

const keys = require('./config/keys')

const app = express()

// app.use(cors())

// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(express.static(path.join(__dirname, 'tmp')));
console.log('my path at entry module', __dirname)

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin','*')
	res.setHeader('Access-Control-Allow-Methods','GET, POST')
	res.setHeader('Access-Control-Allow-Headers','Content-Type, authorization')
	// res.setHeader('Content-Type', 'application/json');
	next()
})

mongoose.Promise = global.Promise
const MONGO_URI = keys.mongoURI
if (!MONGO_URI) {
	throw new Error("incorrect mongoURI")
}
mongoose.connect(MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})
mongoose.connection
	.once('open', () => console.log('db connection successful'))
	.on('error', (err) => console.log('db connection error', err))


// ------------ API SERVER for client --------------

require('./routes/tprMainRt')(app)




//----------- NODEJS ADMIN ------------
const User = require('./models/User')
require('./models/Car')
require('./models/Picmain')
require('./models/Picstyle')
require('./models/Review')

app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: 'aaabbbccc',
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    autoReconnect: true
  })  
}))

app.set('view engine', 'ejs')
app.set('views', 'views')

// various routes to manage account')
require('./routes/adminRt/authRt')(app)
require('./routes/adminRt/carsRt')(app)
require('./routes/adminRt/picsmainRt')(app)
require('./routes/adminRt/picsstyleRt')(app)
require('./routes/adminRt/reviewsRt')(app)
require('./routes/uploadRoutes')(app)

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
// app.use((err, req, res, next) => {
// 	const status = err.status || 500;
// 	const mess = err.message;
// 	res.status(status).send({mess})
// })

app.listen(5000, () => {
		console.log('listen on port 5000');
})


