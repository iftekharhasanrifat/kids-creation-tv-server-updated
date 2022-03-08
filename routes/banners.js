const router = require('express').Router();

const Admin = require("../models/Admin");
const Banner = require("../models/Banner");
const fs = require('fs')


//Create Banner
router.post('/', async (req, res) => {
    const newBanner = new Banner(req.body);
    try {
        const savedBanner = await newBanner.save();
        res.status(200).json(savedBanner);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update Banner
router.put('/:id', async (req, res) => {
    try {
        const updatedBanner = await Banner.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedBanner);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Delete Banner

router.delete('/:id', async (req, res) => {

    const toBeDeletedBanner = await Banner.findById(req.params.id);
    try {
        await Banner.findByIdAndDelete(req.params.id);
        fs.unlink('images/' + toBeDeletedBanner.photo, (err) => {
            if (err) {
                console.error(err)
                return
            }

            //file removed
        })
        res.status(200).json('Banner Delete Success');
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Get Banner
router.get("/:id", async (req, res) => {
    try {
        const Banner = await Banner.findById(req.params.id);
        res.status(200).json(Banner);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//Get All Banners
router.get("/", async (req, res) => {
    try {
        const allBanners = await Banner.find();
        res.status(200).json(allBanners);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router