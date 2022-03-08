import express from 'express'
import ThoughtMessage from "../models/thought.js";
import User from "../models/user.js"
import { deleteThoughtByID, getThoughts , getThoughtsNear, postThoughts, updateThought, voteDown, voteUp , postComment, likePost, unlikePost} from '../controllers/thoughts.js';

const router = express.Router();

router.get('/', getThoughts)

router.post('/', postThoughts)

// router.get('/:id', getThoughtByID)

router.delete('/:id', deleteThoughtByID)

router.get('/near/:long/:lat', getThoughtsNear)

router.patch('/:id/:email/voteUp', voteUp)
router.patch('/:id/:email/voteDown', voteDown)
router.patch('/likePost/:_id/:email', likePost)
router.patch('/unlikePost/:_id/:email', unlikePost)

router.patch('/:id/:comment/postComment', postComment)
export default router;