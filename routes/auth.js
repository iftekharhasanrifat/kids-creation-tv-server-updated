const router = require('express').Router();

const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');

//Register
router.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new Admin({
            username: req.body.username,
            password: hashedPass
        })
        const admin = await newUser.save();
        res.status(200).json(admin)
    } catch (err) {
        res.status(500).json(err)
    }
})


//Login

router.post('/login', async (req, res) => {
    try {
        const admin = await Admin.findOne({ username: req.body.username })
        if (!admin) {
            res.status(400).json("Wrong Credentials");
            return;
        }

        const validated = await bcrypt.compare(req.body.password, admin.password)
        if (!validated) {
            res.status(400).json("Wrong Credentials");
            return;
        }

        const {password, ...others} = admin._doc;
        res.status(200).json(others);
        return;
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router