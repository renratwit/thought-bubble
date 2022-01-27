import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
})

const User = mongoose.model('user', userSchema)

export default User;