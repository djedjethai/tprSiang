const mongoose =require('mongoose')

const { Schema } = mongoose

const picstyleSchema = new Schema({ 
    	style: {
            	type: String,
            	require: false
        },
	pictures: [{
            	type: String,
            	require: false
        }]
})

mongoose.model('Picstyle', picstyleSchema)


