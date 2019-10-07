//Simple version, without validation or sanitation
require('dotenv').config()
const Mail = require('../models/mailModel');
const MailService=require('../services/mailService')
const mongoose=require('mongoose')

exports.sendEmail =  (req, res) => {



    
    const mail =new Mail({
     _id:mongoose.Types.ObjectId(),
    name: req.body.data.name,
    email: req.body.data.email,
    message: req.body.data.message
    })

    mail.save()
    .then(result => {
        MailService.sendEmail(req.body,(error, mailResponse) =>{
                if(error){
                    console.log(error)
                }else{
                    res.status(201).json({
                        response:{
                            message:"Email send succefull",
                            state:true
                        }
                    })
                }
        })
    })
    .catch(error=>{
        res.status(500).json({
            message:error
        })
    })

    
}