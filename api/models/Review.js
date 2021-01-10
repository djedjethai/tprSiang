const mongoose =require('mongoose')

const { Schema } = mongoose

const reviewSchema = new Schema({
	name: {
            	type: String,
            	require: true
        },  
    	comment: {
            	type: String,
            	require: false
        },  
    	picture: {
            	type: String,
            	require: false
        },  
    	when: {
            	type: Date,
		default: Date.now
        }
})

mongoose.model('Review', reviewSchema)



