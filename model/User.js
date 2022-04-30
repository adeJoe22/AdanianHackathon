const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const {Schema, model} = mongoose

const UserSchema = new Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Enter your password"],
        minlength:[6, "Password should be minimum of 6 character"]
    },
    userId: {
        type: Number,
        default: ()=> Math.floor(Math.random()*1e9)
    }
})

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

const UserModel = model("User", UserSchema)
module.exports = UserModel