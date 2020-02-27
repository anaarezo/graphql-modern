import { GraphQLServer } from 'graphql-yoga';

// Scalar types - String, Boolean, Int, Float, ID // String!, Int!, ID! - this means that variable is non-nullable
// Atenção com os IDs do author inteligados ao user
// Demo user data
const users = [{
    id: '1',
    name: 'Ana',
    email: 'mail@mail.com',
    age: 27
}, {
    id: '2',
    name: 'John',
    email: 'john@mail.com',
    age: 28
}, {
    id: '3',
    name: 'Mike',
    email: 'mike@mail.com',
    age: 28
}]

const posts = [{
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
}, {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is an advanced GraphQL post...',
    published: false,
    author: '2'
}, {
    id: '12',
    title: 'Programming Music',
    body: '',
    published: false,
    author: '3'
}]


const comments = [{
    id: '1',
    text: 'Hello, i like it',
}, {
    id: '2',
    text: 'Excellent!',
}, {
    id: '3',
    text: 'Great Article!',
}, {
    id: '4',
    text: 'Good job',
}]

// Type Definitions (Schema) - Custom Types
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        comments: [Comment!]!
        me: User!
        post: Post!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
    }
    type Comment {
        id: ID!
        text: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        users(parent, args, ctx, info) {
            if (!args.query){
                return users
            }

            return users.filter((user) => {
                return user.name.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        posts(parent, args, ctx, info){
            if (!args.query) {
                return posts
            }
            return posts.filter((post) => {
                const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
                const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
                return isTitleMatch || isBodyMatch
            })
        }, 
        comments(parent, args, ctx, info) {
            return comments
        },
        me() {
            return {
                id: '123038',
                name: 'Mike',
                email: 'mike@example.com',
                age: 28
            }
        },
        post() {
            return {
                id: '092',
                title: 'GraphQL 101',
                body: '',
                published: false
            }
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
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