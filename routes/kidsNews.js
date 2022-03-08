const router = require('express').Router();

const Admin = require("../models/Admin");
const KidsNews = require("../models/KidsNews");

const fs = require('fs')




//Create Kids News
router.post('/', async (req, res) => {
    const newKidsNews = new KidsNews(req.body);
    try {
        const savedKidsNews = await newKidsNews.save();
        res.status(200).json(savedKidsNews);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Update Kids News
router.put('/:id', async (req, res) => {
    try {
        const updatedKidsNews = await KidsNews.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedKidsNews);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//Delete Kids News

router.delete('/:id', async (req, res) => {

    const toBeDeletedKidsNews = await KidsNews.findById(req.params.id);
    try {
        await KidsNews.findByIdAndDelete(req.params.id);
        fs.unlink('images/'+toBeDeletedKidsNews.photo, (err) => {
            if (err) {
                console.error(err)
                return
            }
    
            //file removed
        })
        res.status(200).json('Kids News Delete Success');
    }
    catch (err){
        res.status(500).json(err);
    }
})

//Get Kids News
router.get("/:id", async (req, res) => {
    try {
        const kidsNews = await KidsNews.findById(req.params.id);
        res.status(200).json(kidsNews);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
//Get All kidsNews 
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    try {
        let allKidsNews;
        if (qNew) {
            allKidsNews = await KidsNews.find().sort({ createdAt: -1 }).limit(10)
        }
        // const allKidsNews = await KidsNews.find();
        else {
            allKidsNews = await KidsNews.find();
        }
        res.status(200).json(allKidsNews);
    }
    catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router