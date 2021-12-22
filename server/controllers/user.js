import User from "../models/user.js";
import mongoose from 'mongoose';


export const getUsers = async(req, res) => {
    console.log(req.params)
    //await MyModel.find({ name: 'john', age: { $gte: 18 } })

    const response_email = await User.find({email: req.params.email})
    return res.json({email: response_email});
}

export const createUsers = async(req, res) => {
    const user = req.body
    const newUser = new User(user)
    try {
        await newUser.save();
        res.status(201).json(newUser)
    } catch(e) {
        console.log(e)
    }
}