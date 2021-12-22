import express from 'express'
import ThoughtMessage from "../models/thought.js";
import User from "../models/user.js"
import { deleteThoughtByID, getThoughts , getThoughtsNear, postThoughts, updateThought, voteDown, voteUp } from '../controllers/thoughts.js';

const router = express.Router();

router.get('/', getThoughts)

router.post('/', postThoughts)

// router.get('/:id', getThoughtByID)

router.delete('/:id', deleteThoughtByID)

router.get('/near/:long/:lat', getThoughtsNear)

router.patch('/:id/voteUp', voteUp)
router.patch('/:id/voteDown', voteDown)

export default router;