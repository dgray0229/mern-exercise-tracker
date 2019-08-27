const router = require('express').Router(); // We're creating a route
const Exercise = require('../models/exercise.model'); // We're requiring the exercise.model that we created to use as the Mongoose model

// This base url is the localhost:5000/exercises route that server.js served, then when that url is called, this route handler is called
// if the route is just /exercises/ this Exercise.find() function will find all of the exercises and return them, 
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json(`Error: ${err}`));
});
// if the route is /exercises/add, we create a post request to the server with the new exercise.
router.route('/add').post((req, res) => {
    // request.body.username will be saved as our username variable
    // request.body.description will be saved as our description variable
    // request.body.duration will be saved as our duration variable
    // request.body.date will be saved as our date variable
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); // We're converting the duration to a Number datatype with the Number() method
    const date = Date.parse(req.body.date); // We're converting the date to a Date datatype using Date.parse()
    // our newExercise will be a new instance of Exercise, using the Exercise model that we created in our exercise.model.js file 
    // with the {username, description, duration, date} data being passed in
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });
    // The exercise will either be saved successfully and we receive a success message, or unsuccessful and throw an error message with status 400
    // We take that exercise response and return it as json, or else we return an error with the status of 400
    newExercise.save()
        .then(() => res.json('Exercise added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});
// router.route('/:id) is like a variable, similar to wildcards in SQL, where it will be replaced by an actual object id that is automatically created by MongoDB
// We're only going to request information based on this exercise, based on it's ID
router.route('/:id').get((req, res) => {
    // req.params.id is getting the ID directly from the URL
    // We take that exercise response based on it's ID and return it as json, or else we return an error with the status of 400
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json(`Error: ${err}`));
});
// We're only going to delete information based on this exercise, based on the ID that we're taking from the URL
// This will be similar to the get request, except we'll be getting the ID to delete it. 
router.route('/:id').delete((req, res) => {
    // req.params id is getting the ID directly form the URL
    // We take that ID and make a delete request. If it is successful, we return a success message, otherwise, we return an error message with the status of 400
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});
// We're only going to make a post to a specific ID, instead of creating a new ID and posting to it
// This update request will have its own /update/ url to make the request from
router.route('/update/:id').post((req, res) => {
    // req.params id is getting the ID directly form the URL
    // We take that ID and we will update the returned values with new ones
    // A successful request will take the data returned after finding the ID, and replace those values (exercise.value) with an updated request variable (req.body.value)
    // We will be assigning the keys that we received from the database with the field values of the exercise that already exist 
    // The innermost .catch() method will return an error if we make an unsuccessful request to the database based on its ID
    // the outermost .catch() method will return an error if we unsuccessfully save the updated values back to the database
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);
            // After we replace the exercise keys with updated values, we then run a save method to post those values to the server
            // We take that ID and make an update request. If it is successful, we return a success message, otherwise, we return an error message with the status of 400
            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json(`Error: ${err}`))
        })
        .catch(err => res.status(400).json(`Error: ${err}`))
});


module.exports = router;