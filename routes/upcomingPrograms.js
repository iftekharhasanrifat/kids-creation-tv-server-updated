const router = require('express').Router();

const Admin = require("../models/Admin");
const UpcomingProgram = require("../models/UpcomingProgram");
const fs = require('fs')


//Create upcomingProgram
router.post('/', async (req, res) => {
    const newUpcomingProgram = new UpcomingProgram(req.body);
    try {
        const savedUpcomingProgram = await newUpcomingProgram.save();
        res.status(200).json(savedUpcomingProgram);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update upcomingProgram
router.put('/:id', async (req, res) => {
    try {
        const updatedUpcomingProgram = await UpcomingProgram.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedUpcomingProgram);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Delete upcomingProgram

router.delete('/:id', async (req, res) => {

    const toBeDeletedUpcomingProgram = await UpcomingProgram.findById(req.params.id);
    try {
        await UpcomingProgram.findByIdAndDelete(req.params.id);
        fs.unlink('images/' + toBeDeletedUpcomingProgram.photo, (err) => {
            if (err) {
                console.error(err)
                return
            }

            //file removed
        })
        res.status(200).json('UpcomingProgram Delete Success');
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Get upcomingProgram
router.get("/:id", async (req, res) => {
    try {
        const upcomingProgram = await UpcomingProgram.findById(req.params.id);
        res.status(200).json(upcomingProgram);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//Get All upcomingPrograms
router.get("/", async (req, res) => {
    try {
        const allUpcomingPrograms = await UpcomingProgram.find();
        res.status(200).json(allUpcomingPrograms);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router