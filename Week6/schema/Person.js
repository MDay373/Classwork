const mongoose = require("mongoose");

let personSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
})

module.exports = mongoose.model('Person', personSchema);
