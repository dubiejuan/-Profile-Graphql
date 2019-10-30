const { buildSchema } = require('graphql')

module.exports = buildSchema(
    `type Email {
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
    }`
)
