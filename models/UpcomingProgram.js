const mongoose = require('mongoose');

const UpcomingProgramSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    photo : {
        type: String,
    }
},{timestamps:true})

module.exports = mongoose.model("UpcomingProgram",UpcomingProgramSchema);