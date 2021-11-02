import express from 'express'
import ThoughtMessage from "../models/thought.js";
import { deleteThoughtByID, getThoughts , getThoughtsNear, postThoughts, updateThought } from '../controllers/thoughts.js';

const router = express.Router();

router.get('/', getThoughts)

router.post('/', postThoughts)

// router.get('/:id', getThoughtByID)

router.delete('/:id', deleteThoughtByID)

router.get('/near/:long/:lat', getThoughtsNear)

export default router;