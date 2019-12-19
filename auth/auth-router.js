const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const Users = require('../users/user-model.js');

// for endpoints beginning with /api/auth
router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 8); // 2 ^ n
    user.password = hash;

    Users.registerUser(user)
        .then(saved => {
        res.status(201).json(saved);
        })
        .catch(error => {
        res.status(500).json(error);
        });
});

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.getUsersBy({ username })
        .first()
        .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            //sign token
            const token = signToken(user);

            res.status(200).json({
            token,
            message: `Welcome ${user.username}, of department ${user.department}!`,
            });
        } else {
            res.status(401).json({ message: 'Invalid Credentials' });
        }
        })
        .catch(error => {
        res.status(500).json(error);
        });
});

function signToken(user) {
    const payload = {
        username: user.username,
        department: user.department, // this will come from the database
    };

    const secret = process.env.JWT_SECRET || 'Super duper secret'

    const options = {
        expiresIn: '12h',
    }

    return jwt.sign(payload, secret, options);
}

module.exports = router;
