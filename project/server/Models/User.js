import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    address:{type:String,require:true},
    password:{type:String,require: true},
})
const User = mongoose.model("User",userschema)
export default User