import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    sub: String,
    createdPosts: Array,
    likedPosts: Array,
})

const User = mongoose.model('user', userSchema)

export default User;