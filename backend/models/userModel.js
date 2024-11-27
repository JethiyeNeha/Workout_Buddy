const mongoose = require('mongoose')
const bcrypt= require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    }
})

//static signup method

userSchema.statics.signup = async function(email,password){

    //validation

    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Please enter a valid email')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Please enter a strong password')
    }

    const exist = await this.findOne({email})
    if(exist){
        throw("Email already Exists")
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    const user = await this.create({email, password: hash})
    return user
}
module.exports = mongoose.model('User', userSchema)