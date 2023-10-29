import express from "express";
import { PORT, mongoDBURL } from "./config.js"
import mongoose, { mongo } from 'mongoose'
import { Book } from './models/bookModel.js'
import booksRoute from './routes/bookRoute.js'
import cors from 'cors';

const app = express();

//middleware for parsing request body

app.use(express.json());

// Middleware for handling cors policy
// Option 1: Allow All Origins with Default of cors(*)

app.use(cors())

// Option 2: Allow Custom Origins

// app.use(
//     cors({
//         orign: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: [Content - Type],
//     })
// )

app.get('/', (request, response) => {
    console.log(request)
    return response.status(255).send('welcome to amravati')
})

app.use('/books', booksRoute)

mongoose.connect(mongoDBURL).then(() => {
    console.log("App connected to database")
    app.listen(PORT, () => {
        console.log(`App is listening to port:${PORT}`)
    })
}).catch((error) => {
    console.log(error)
})
