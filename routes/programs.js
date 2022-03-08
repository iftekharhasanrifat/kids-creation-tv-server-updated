const router = require('express').Router();

const Admin = require("../models/Admin");
const Program = require("../models/Program");
//Create Program
router.post('/', async (req, res) => {
    const newProgram = new Program(req.body);
    try {
        const savedProgram = await newProgram.save();
        res.status(200).json(savedProgram);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update Program
router.put('/:id', async (req, res) => {
    try {
        const updatedProgram = await Program.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedProgram);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Delete Program

router.delete('/:id', async (req, res) => {
    try {
        await Program.findByIdAndDelete(req.params.id);
        res.status(200).json('Program Delete Success');
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Get Program
router.get("/:id", async (req, res) => {
    try {
        const program = await Program.findById(req.params.id);
        res.status(200).json(program);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//Get All Programs
router.get("/", async (req, res) => {
    const category = req.query.cat;
    try {
        let programs;
        if (category) {
            programs = await Program.find({category});
        }
        else{
            programs = await Program.find();
        }
        res.status(200).json(programs);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router