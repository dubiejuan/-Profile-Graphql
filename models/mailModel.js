'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema

let mailSchema = new Schema({
    _id:mongoose.Types.ObjectId,
    name: {type: String, required: false},
    email: {type: String, required: true},
    message: {type: String, required: true },
    createTime: { type: Date, default: Date.now },
})
// Export the model
module.exports = mongoose.model('Mail', mailSchema);