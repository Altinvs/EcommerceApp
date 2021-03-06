const mongoose = require('mongoose')

const Schema = mongoose.Schema;

//create user schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = User =mongoose.model('users', UserSchema);