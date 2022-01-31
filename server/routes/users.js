import express from 'express'
import { getUsers, createUsers, loginUser } from '../controllers/user.js';
import ThoughtMessage from "../models/thought.js";
import User from "../models/user.js"

const router = express.Router();


router.get('/:email', getUsers)
router.post('/register/', createUsers)
router.get('/login/', loginUser)

export default router;