const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        unique: false,
    },
    link:{
        type: String,
        required: true,
    }
},{timestamps:true})

module.exports = mongoose.model("Program",ProgramSchema);