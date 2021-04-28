const mongoose =require('mongoose')

const { Schema } = mongoose

const picstyleSchema = new Schema({ 
    	style: {
            	type: String,
            	require: false
        },
	pic: [{
            	type: String,
            	require: true
        }]
})

mongoose.model('Picstyle', picstyleSchema)


