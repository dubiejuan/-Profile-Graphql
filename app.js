'use strict'
require('dotenv').config()
const  express  = require('express')
const cors = require('cors')
const bodyParser= require('body-parser')
const morgan = require('morgan')
const mongoose=require('mongoose')
const graphqlHttp =require('express-graphql')
const {buildSchema} =require('graphql')
  
const app = express()






//CONNECT TO DATA BASE
mongoose.connect(
    `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`,{
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
    .then(() => {
       console.log('connected')
       
    })
    .catch((error) => {
       console.log('error',error)
   
    })


//MORGAN FOR HTTP request info
app.use(morgan('dev'))


//BODY PARSE FOR BODY DATA




app.use(bodyParser.json())
/*
let whitelist = ['http://localhost:5000']

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
*/
app.use(cors())


/*
 type RootMutation {
                createEmail(_id:ID;
                    name: String!,
                    email: String!,
                    message: String!,
                    createTime: String!):String
            }
            */

app.use('/graphql',graphqlHttp({
        schema:buildSchema(
            `type RootQuery {
                emails:[String!]!
              }
              
              type RootMutation {
                createEmail(name:String):String
              }

            schema {
                query:RootQuery
                mutation:RootMutation
            }
        `),
        rootValue:{
            emails:()=>{
                return ['juancho']
                 
            },
            createEmail:()=>{
              console.log(args)
              const evenName=args.name;
              return evenName;
              
            }
            
            
        },
        graphiql:true
}))





app.listen(process.env.PORT,()=>{
    console.log('Listening por',process.env.PORT)
})