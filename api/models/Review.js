const mongoose =require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema({
	name: {
            	type: String,
            	require: false
        },  
    	comment: {
            	type: String,
            	require: false
        },  
    	pic: {
            	type: String,
            	require: true
        },  
    	quand: {
            	type: Date,
		default: Date.now
        }
})

mongoose.model('Review', reviewSchema)



