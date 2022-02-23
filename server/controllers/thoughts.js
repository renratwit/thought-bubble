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
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min)
    }
    console.log(req.params)
    const long = req.params.long
    const lat = req.params.lat
    console.log(`My Coords: ${long} ${lat}`)
    try {
        await ThoughtMessage.find({
            location: {
                $near: {
                    $maxDistance: 10000,
                    $geometry: {
                        type: "Point",
                        coordinates: [long, lat]
                    }
                }
            }
        }).find((error, results) => {
            if(error) console.log(error)
            // randomly offset the coordinates so exact location is unknown
            results.forEach(r => {
                let o = 400
                let offset1 = getRandomInt(-o, o);
                let offset2 = getRandomInt(-o, o);
                let d = 111111;
                
                // console.log("Date: ", r.dateCreated)
                r.location.coordinates[0] += offset1 / d
                r.location.coordinates[1] += offset2 / d
            })

            results.sort((a, b) => b.dateCreated - a.dateCreated)
            
        
            res.json(results)
        })
    } catch (e) {
        console.error(e)
    }

}

export const voteUp = async(req, res) => {
    console.log('Up Vote', req.params);
    const {id: _id} = req.params
    const email = req.params.email;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("_ID NOT FOUND");

    const post = await ThoughtMessage.findById(_id)

    const updatedData = await ThoughtMessage.findByIdAndUpdate(_id, 
        {rating: post.rating + 1, 
        $addToSet: {upVoted: [email]},
        $pull: {downVoted: {$in: [email]}}
        },
        {new: true});
    return res.json(updatedData)
}

export const voteDown = async(req, res) => {
    console.log('Down Vote');
    const {id: _id} = req.params
    const email = req.params.email

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("_ID NOT FOUND");

    const post = await ThoughtMessage.findById(_id)

    const updatedData = await ThoughtMessage.findByIdAndUpdate(_id,
        {
        rating: post.rating - 1,
        $addToSet: {downVoted: [email]},
        $pull: {upVoted: {$in: [email]}}
        },
        {new: true});
    return res.json(updatedData)
}

export const postComment = async(req, res) => {
    console.log("Header", req.header)
    console.log("Posting comment ", req.params)
    try{
        const {id: _id} = req.params;
        const comment = req.params.comment
    
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(400).send("_ID NOT FOUND");
    
        const updatedData = await ThoughtMessage.findByIdAndUpdate(_id,
            {
            $addToSet: {comments: [comment]},
            },
            {new: true});
        return res.json(updatedData);
    } catch(e) {
        console.log(e)
    }
   
}

export const likePost = async(req, res) => {
    console.log('Like Post', req.params)
    const id = req.params._id;
    const email = req.params.email;
    console.log(id)
    console.log(email)

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('ID NOT FOUND');
        const post = await ThoughtMessage.findById(id);
        // console.log(post)

        const newData = await ThoughtMessage.findByIdAndUpdate(id,
            {
                rating: post.rating + 1,
                $addToSet: {upVoted: [email]}
            },
            {new: true}
            );

        console.log("here")   
         
        return res.json(newData);

    } catch(e) {
        console.log(e)
    }
    console.log("foo")
}