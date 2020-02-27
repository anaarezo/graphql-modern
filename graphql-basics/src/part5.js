import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID
// String!, Int!, ID! - this means that variable is non-nullable

// Type Definitions (Schema) - Custom Types
const typeDefs = `
    type Query {
        me: User!

    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: '123038',
                name: 'Mike',
                email: 'mike@example.com',
                age: 28
            }
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