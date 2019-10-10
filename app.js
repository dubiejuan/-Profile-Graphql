'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
const {
  buildSchema
} = require('graphql')
const Mail = require('./models/mailModel');
const MailService = require('./services/mailService')
const app = express()


//CONNECT TO DATA BASE
mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  .then(() => {
    console.log('connected')

  })
  .catch((error) => {
    console.log('error', error)

  })


//MORGAN FOR HTTP request info
app.use(morgan('dev'))


//BODY PARSE FOR BODY DATA

app.use(bodyParser.json())

let whitelist = ['http://localhost:8080']

let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))
app.use(cors())


app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
              type Email {
                _id:ID
                name: String!
                email: String!
                message: String!
                createTime: String!
              }
              input EmailInput{
                _id:ID
                name: String!
                email: String!
                message: String!
              }
              
              type RootQuery {
                emails:[Email!]!
              }
              
              type RootMutation {
                createEmail(emailInput:EmailInput):Email
              }

            schema {
                query:RootQuery
                mutation:RootMutation
            }
        `),
  rootValue: {
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

}))





app.listen(process.env.PORT, () => {
  console.log('Listening por', process.env.PORT)
})