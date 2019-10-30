'use strict'
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const mongoose = require('mongoose')
const graphqlHttp = require('express-graphql')
const graphqlSchema=require('./graphql/schemas/index')
const graphqlResolver=require('./graphql/resolvers/index')
const app = express()


async function start(){
//conect to db
 try {
    await mongoose.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   })
   
   } catch (error) {
     console.log(error,'error')
    
   }
//MORGAN FOR HTTP request info
app.use(morgan('dev'))


//BODY PARSE FOR BODY DATA

app.use(bodyParser.json())

// let whitelist = ['http://localhost:8080']

// let corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

//app.use(cors(corsOptions))
app.use(cors())


app.use('/graphql', graphqlHttp({
  schema: graphqlSchema,
  rootValue:graphqlResolver,
  graphiql:true
}))


app.listen(process.env.PORT, () => {
  console.log('Listening por', process.env.PORT)
})

}
start()



