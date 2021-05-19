const { model, Schema } = require('mongoose')
const bcrypt = require('bcryptjs')


const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "please provide a username"]
    },
    email: {
        type: String,
        required: [true, "please provide a username"],
        unique: true,
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "please provide a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: String
})

UserSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next()
    }
    
    // encription
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

module.exports = model('user', UserSchema)