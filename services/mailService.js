const nodemailer = require('nodemailer')

module.exports={

    sendEmail:(data,cb)=>{
        Promise.resolve(send(data))
        .then(mailResponse => {
            return cb(undefined, mailResponse);      
         })
             .catch(e => {  
                 console.log('errror',e)                                                                       
        Promise.resolve(send(data))
           .then(mailResponse => {
            return cb(undefined, mailResponse);
          })
                 .catch(e => {
                    return cb(undefined, e);
              })
     })
    }


}

 function  send (data){
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
                service:'gmail',
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.PASSWORD}`
                }
            })

           
            // send mail with defined transport object
            const mailOptions={
                from: `${data.name}<${data.email}>`, // sender address
                to: 'juan.dubie@gmail.com , juan_dubie@hotmail.com', // list of receivers
                subject: 'Consulta via Pagina Web', // Subject line
                text: `${data.message} de ${data.email} `, // plain text body
                //html: '<b>Hello world?</b>' // html body
            }
         
                transporter.sendMail(mailOptions,(error,info)=> {
                    if(error){
                        reject(err)
                         }
                        resolve(info)
                })
          })

        

}
