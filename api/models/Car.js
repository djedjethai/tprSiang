const mongoose =require('mongoose')

const { Schema } = mongoose

const carSchema = new Schema({
	serie: {
            	type: String,
            	require: true
        },  
    	serieDetails: {
            	type: String,
            	require: false
        },  
    	wheel: {
            	type: String,
            	require: false
        },  
    	engine: {
            	type: String,
            	require: false
        },
	grade: {
		type: String,
            	require: false
	},
	price: {
		type: String,
            	require: false
	},
	color: {
		type: String,
            	require: false
	},
	details: {
		type: String,
            	require: false
	},
	pic: {
		type: String,
            	require: true
	},
	style: {
		type: String,
            	require: true
	},
	type: {
		type: String,
            	require: true
	},
	bestSeller: {
		type: String,
            	require: true
	}
})

mongoose.model('Car', carSchema)



