const router = require('express').Router();

const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
//Update
router.put('/:id', async (req, res) => {
    if(req.body.userId===req.params.id){
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updatedUser = await Admin.findByIdAndUpdate(req.params.id,{
                $set: req.body,
            },{new:true});
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(401).json("You can update only your account");
    }
})

//Delete
router.delete('/:id', async (req, res) => {
    if(req.body.userId===req.params.id){
        try {
            await Admin.findByIdAndDelete(req.params.id)
            res.status(200).json("admin has been deleted");
        } catch (err) {
            res.status(500).json(err)
        }
    }
    else{
        res.status(401).json("You can delete only your account");
    }
})

//Get Admin
router.get("/:id",async (req,res)=>{
    try{
        const admin = await Admin.findById(req.params.id);
        const {password,...others}= admin._doc;
        res.status(200).json(others);
    }
    catch (err){
        res.status(500).json(err);
    }
})

module.exports = router