import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import thoughtRoutes from './routes/thoughts.js'
import userRoutes from './routes/users.js'
import dotenv from 'dotenv'
import https from 'https'
import fs from 'fs'

let key = fs.readFileSync('./selfsigned.key')
let cert = fs.readFileSync('./selfsigned.crt')

let options = {
    key: key,
    cert: cert,
    ssl: true,
}

const app = express();
dotenv.config();


app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());
app.use('/', thoughtRoutes)
app.use('/users', userRoutes)

const CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
console.log("Connect ", CONNECTION_URL)

const PORT = process.env.PORT || 5000;


mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true, ssl: true})
    .then(() => app.listen(PORT, () => console.log(`Server Alive on Port ${PORT}`)))
    .catch((error) => console.log(error.message))