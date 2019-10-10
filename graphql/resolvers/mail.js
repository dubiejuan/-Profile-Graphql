//Simple version, without validation or sanitation
require('dotenv').config()
const Mail = require('../models/mailModel');
const MailService=require('../services/mailService')
const mongoose=require('mongoose')

exports.sendEmail =  (req, res) => {

   
}