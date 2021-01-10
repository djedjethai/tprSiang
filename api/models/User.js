const mongoose =require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    name: {
            type: String,
            require: true
        },  
    password: {
            type: String,
            require: false
        },  
    resetToken: {
            type: String,
            require: false
        },  
    resetTokenExpiration: {
            type: Date,
            require: false //en fait pas besoin de precision bc by default require est false
        }  
})

module.exports = mongoose.model('User', userSchema)
