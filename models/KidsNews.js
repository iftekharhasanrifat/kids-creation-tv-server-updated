const mongoose = require('mongoose');

const KidsNewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
        required: true,
    },
    photo : {
        type: String,
    }
},{timestamps:true})

module.exports = mongoose.model("KidsNews",KidsNewsSchema);