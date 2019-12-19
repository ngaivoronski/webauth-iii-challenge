const router = require('express').Router();

const Users = require('./user-model.js');
const restricted = require('../auth/restricted-middleware.js');

// const role = 'admin';

router.get('/', restricted, (req, res) => {
    let { username, department } = req.token;

    Users.getUsersBy({ department })
        .then(users => {
        res.json(users);
        })
        .catch(err => res.send(err));
});

// function checkRole(role) {
//     return function(req, res, next) {
//         if(req.token && role === req.token.role) {
//         next();
//         } else {
//         res.status(403).json({ message: `invalid role, you must be a ${role} to see all of the users.` })
//         }
//     }
// }

module.exports = router;
