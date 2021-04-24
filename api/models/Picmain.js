const mongoose =require('mongoose')

const { Schema } = mongoose

const picmainSchema = new Schema({
    	pic: [{
            	type: String,
            	require: false
        }]
 })

mongoose.model('Picmain', picmainSchema)


