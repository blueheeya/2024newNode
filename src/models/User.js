const { default: mongoose } = require("mongoose");

const UserSchema =  mongoose.Schema({
    username:{
        type: String,
        required:true
    },
    name :{
        first:{
            type: String,
            required:true
        },
        last:{
            type: String,
            required:true
        }
    },
    age: Number,
    email: String
},{TimeRanges:true})

const User = mongoose.model("User",UserSchema)
module.exports = {User}
