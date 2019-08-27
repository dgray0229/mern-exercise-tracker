const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); // body-parser is no longer needed since it comes with express

const uri = process.env.ATLAS_URI;
// { useNewUrlParser: true } the MongoDB Mongoose driver has changed recently, so we need these two flags to change how we connect to the database.
// { useCreateIndex: true } is to deal with MongoDB deprecating the ensure index function
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }); 
const connection = mongoose.connection;
// Once the database connection has been opened, we see the success message.
connection.once('open', () => {console.log('MongoDB database connection established successfully')});

const exerciseRouter = require('./routes/exercises');
const userersRouter = require('./routes/users');

app.get('/', () => console.log("Hello World!"));
app.use('/exercises', exerciseRouter);
app.use('/users', userersRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}!`))