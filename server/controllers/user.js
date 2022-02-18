import User from "../models/user.js";
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken'
import bcryptjs from "bcryptjs";


export const getUsers = async(req, res) => {
    console.log(req.params)
    //await MyModel.find({ name: 'john', age: { $gte: 18 } })

    const response_email = await User.find({email: req.params.email})
    return res.json({email: response_email});
}

export const createUsers = async(req, res) => {
    try{
        console.log("Creating user ", req.body)
        const newPassword = await bcryptjs.hash(req.body.password, 10);
        const user = await User.create({name: req.body.name, email: req.body.email, password: newPassword})
        // const newUser = new User(req.body)
        // newUser.save();
        res.json({status: 'ok'})
    }catch(e) {res.json({ status: 'error', error: 'Duplicate email' })}
}

export const loginUser = async(req, res) => {
    console.log("logging in ",req.body)

    const user = await User.findOne({email: req.body.email, password: req.body.password});
    if (user) {

        const token = jwt.sign({
            name: user.name,
            email: user.email
        }, 'secret123')

        console.log('User ', user)
        return res.json({status: 'ok', user: token})
    } else {
        console.log('no user found')
        return res.json({status: 'error', user: false})
    }

}