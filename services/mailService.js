'use strict'
require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = {
    //Make function  return a promise so thtat the await waits for the function to finish exectution
    sendEmail: (data) => {
        return new Promise((resolve, reject) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.PASSWORD}`
                }
            })
            // send mail with defined transport object
            const mailOptions = {
                from: `${data.name}<${data.email}>`, // sender address
                to: 'juan.dubie@gmail.com , juan_dubie@hotmail.com', // list of receivers
                subject: 'Consulta via Pagina Web', // Subject line
                text: `${data.message} de ${data.email} `, // plain text body
                //html: '<b>Hello world?</b>' // html body
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {           
                    reject(error)
                }
                resolve(info)
            })
        })
    }
}