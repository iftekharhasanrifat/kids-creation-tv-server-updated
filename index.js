const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const adminRoute = require('./routes/admins');
const kidsNewsRoute = require('./routes/kidsNews');
const programRoute = require('./routes/programs');
const upComingProgramRoute = require('./routes/upcomingPrograms');
const bannerRoute = require('./routes/banners');
const multer = require('multer');
const path = require('path');
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));
dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images")));
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})
    .then(console.log("Connected to Mongo"))
    .catch(err => console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    },
    filename: (req, file, cb) => {
        cb(null,req.body.name);
    }
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded");
})

app.use("/api/auth", authRoute);
app.use("/api/admins", adminRoute);
app.use("/api/kidsNews", kidsNewsRoute);
app.use("/api/programs", programRoute);
app.use("/api/upcomingPrograms", upComingProgramRoute);
app.use("/api/banners", bannerRoute);

app.listen("5000", () => {
    console.log("backend is running")
})