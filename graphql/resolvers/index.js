const Mail = require('../../models/mailModel');
const MailService = require('../../services/mailService')
const mongoose = require('mongoose')
module.exports={
    emails: () => {
      return Mail.find({})
        .then((mailsResponse) => {
          return mailsResponse.map(key => {
            return {
              ...key._doc,
              _id: key.id
            }
          })
        })
        .catch((error) => {
          throw error
        })
    },
    createEmail: async (args) => {

      const mail = new Mail({
        _id: mongoose.Types.ObjectId(),
        name: args.emailInput.name,
        email: args.emailInput.email,
        message: args.emailInput.message
      })

      try {
        let saveModel = await mail.save()

        try {
          let mailResponse = await MailService.sendEmail(args.emailInput)
          console.log('email response', mailResponse)
          return saveModel
        } catch (errorMail) {
          return errorMail
        }
      } catch (error) {
        return error
      }
    }
  }