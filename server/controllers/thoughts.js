import ThoughtMessage from "../models/thought.js";
import mongoose from 'mongoose';

export const getThoughts = async(req, res) => {
    try{
        const message = await ThoughtMessage.find();
        res.status(200).json(message)
    } catch(e) {
        console.log(e)
    }
}

export const postThoughts = async(req, res) => {
    const thought = req.body;
    console.log(thought)

    const newThought = new ThoughtMessage(thought)

    try {
        await newThought.save();
        res.status(201).json(newThought)
    }catch(error) {
        console.error(error)
        res.json({"status": error.message})
    }
}

export const deleteThoughtByID = async (req, res) => {
    const id = req.params.id
    const deletedThought = await ThoughtMessage.findByIdAndDelete(id)

    res.json(deletedThought)
}

export const updateThought = async(req, res) => {
    console.log(req.body)
    const updatedMessage = req.body
    const id = req.params.id
    const updatedThought = await ThoughtMessage.findByIdAndUpdate(id, updatedMessage)

    res.json(updatedThought)
}

export const getThoughtsNear = async(req, res) => {
    console.log(req.params)
    const long = req.params.long
    const lat = req.params.lat
    console.log(`My Coords: ${long} ${lat}`)
    await ThoughtMessage.find({
        location: {
            $near: {
                $maxDistance: 2000,
                $geometry: {
                    type: "Point",
                    coordinates: [long, lat]
                }
            }
        }
    }).find((error, results) => {
        if(error) console.log(error)
        res.json(results)
    })
}