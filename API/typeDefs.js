import {gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    getUser(id: ID!): [User!]!,
    allUsers: [User!]!
  }

  type User {
  	id: ID!
    fname: String!,
    lname: String!,
    phone: String!,
    email: String!
  }

  type Mutation {
  	createUser(fname: String!,lname: String!,phone: String!,email: String!): String!
  	updateUser(id: ID!,fname: String!,lname: String!,phone: String!,email: String!): String!
  	deleteUser(id: ID!): String!
  }
`
