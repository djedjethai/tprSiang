const mongoose =require('mongoose')

const { Schema } = mongoose

const picmainSchema = new Schema({
    	pic: {
            	type: String,
            	require: true
        }
 })

mongoose.model('Picmain', picmainSchema)


