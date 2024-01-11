import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import mongoose from 'mongoose'
import { resolvers } from './resolvers'
import { typeDefs } from './typeDefs'

const PORT = 3001

const startServer = async () => {
  const app = express()

  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  server.applyMiddleware({ app })



  mongoose.connect('MONGO_DATABASE_URL', { useUnifiedTopology: true, useNewUrlParser: true })

  app.listen({ port: PORT }, () => {
    console.log(`Server ready at http://localhost:${PORT}/graphql`)
  })
}

startServer()
