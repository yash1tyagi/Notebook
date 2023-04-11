const express = require("express");
const router = express.Router();
const User = require("../modeles/User");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'yashisagoodboy';
const { body, validationResult } = require('express-validator');
// validations

    // if there are errors , return bad request and the error
    router.post('/', [
    body('name', "please enter a valid name").isLength({ min: 3 }),
    body('email', "please enter a valid email").isEmail(),
    body('password', "please enter a valid password").isLength({ min: 5 }),
], async (req, res) => {
 errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // Check weather the user with this email exists alredey
    try {

        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry a user with this emai is alerdy exixts" })
        }
        // Creating hash
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        // creating auth Tocken 
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })
        //res.json(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred")
    }
})
// Auyhenticate a user useing: POST "/api/auth/login". No login requird

    router.post('/login', [
        body('email', "please enter a valid email").isEmail(),
        body('password', "password can not be blank").exists(),
    ], async (req, res) => {
       let success = false;
        errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        try {
            let user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({error: "Pleses try to login right credential"})
            }
            const passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                success = false;
                return res.status(400).json({success, error: "Pleses try to login right credential"})
            }
            const data = {
                user: {
                    id: user.id
                }
            }
            const authtoken = jwt.sign(data, JWT_SECRET);
            success = true;
            res.json({success, authtoken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Some Error occurred")
        }
    })
// get loggesin user Details: Post "/api/auth/getuser".login required
router.post('/getuser', fetchuser, async(req, res)=>{
try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (error) {
    console.error(error.message);
    res.status(500).send("Some Error occurred")
}
})
module.exports = router