import User from "../models/user.js";
import mongoose from 'mongoose';


export const getUsers = async(req, res) => {
    console.log(req.params)
    //await MyModel.find({ name: 'john', age: { $gte: 18 } })

    const response_email = await User.find({email: req.params.email})
    return res.json({email: response_email});
}

export const createUsers = async(req, res) => {
    try{
        console.log("Creating user ", req.body)
        const user = await User.create({name: req.body.name, email: req.body.email, password: req.body.password})
        res.json({status: 'ok'})
    }catch(e) {console.error(e)}
}

export const loginUser = async(req, res) => {
    console.log(req.body)
    try {

    }catch(e) {
        console.error(e)
    }
}