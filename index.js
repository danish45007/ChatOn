const Path = require("path");
require('dotenv').config({ path: Path.join(__dirname, `.env.staging`) });
const { ApolloServer } = require('apollo-server');
const gql = require('graphql-tag');
const mongoose = require('mongoose')
const Posts = require('./models/Post')

const typeDefs = gql`

    type Post{
        id: ID!,
        body: String!,
        username: String!,
        createdAt: String!
    }

    type Query{
        getPosts: [Post]
    }
`
const resolvers = {
    Query: {
        async getPosts() {
            try {
                const posts = await Posts.find()
                return posts

            } catch (err) {
                console.log(err)
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers
})

// server.applyMiddleware(morgan('short'))

// connecting to mongoDB atlas
mongoose.connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => console.log("Connected to DB"))
.catch((err) => console.log(err))


server.listen({port:5000}).then(res => {
    console.log(`Server is running at port ${res.url}`)
})