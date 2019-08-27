const router = require('express').Router(); // We're creating a route
const User = require('../models/user.model'); // We're requiring the user.model that we created to use as the Mongoose model

// This base url is the localhost:5000/users route that server.js served, then when that url is called, this route handler is called
// if the route is just /users/ this User.find() function will find all of the users and return them, 
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json(`Error: ${err}`));
});
// if the route is /users/add, we create a post request to the server with the new user.
router.route('/add').post((req, res) => {
    // request.body.username will be saved as our username variable
    const username = req.body.username;
    // our newUser will be a new instance of User, using the User model that we created in our user.model.js file, with the req.body.username data being passed in
    const newUser = new User({
        username
    });
    // The user will either be saved successfully and we receive a success message, or unsuccessful and throw an error message with status 400
    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;