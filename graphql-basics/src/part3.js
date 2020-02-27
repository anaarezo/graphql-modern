import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
// String!, Int!, ID! - this means that variable is non-nullable

// Type Definitions (Schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float
    }
`

// Resolvers
const resolvers = {
    Query: {
        id() {
          return 'abc12'
        },
        name() {
          return 'Ana Laura'
        },
        age() {
          return 27
        },
        employed() {
          return true
        },
        gpa() {
          return null
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!');
});