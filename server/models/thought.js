import mongoose from 'mongoose'

const thoughtSchema = mongoose.Schema({
    message: String,
    location: {
        type: {type: String},
        coordinates: {type: [Number]},
    }
    
});

thoughtSchema.index({location: "2dsphere"})
const thoughtMessage = mongoose.model('thoughtMessage', thoughtSchema)

export default thoughtMessage;