const mongoose =require('mongoose')

const { Schema } = mongoose

const picmainSchema = new Schema({
    	pictures: [{
            	type: String,
            	require: false
        }]
 })

mongoose.model('Picmain', picmainSchema)


