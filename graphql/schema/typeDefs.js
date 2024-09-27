const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Contact {
      id: ID!
      name: String!
      email: String!
      phone: String!
      address: String!
      image: String  
    }

    input UserInput {
      name: String!
      email: String!
      phone: String!
      address: String!
      image: String
    }

    input UserInput1 {
      id:  ID!
      name: String!
      email: String!
      phone: String!
      address: String!
      image: String
    }

  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Query {
    getUsers: [User!]!
    getUser(id: ID!): User
    me: User
    contacts: [Contact!]!
    getContact(id: ID!): Contact!
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    addContacts(contact: UserInput!): Contact!
    updateContact(contact: UserInput1!): Contact!
    deleteContact(id: ID!): Contact!
    bulkUpload(contacts: [UserInput!]!): [Contact!]!
  }
`;

module.exports = typeDefs;