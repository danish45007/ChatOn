const Path = require('path');
require('dotenv').config({ path: Path.join(__dirname, `.env.staging`) });
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typedef');
const resolvers = require('./graphql/resolvers/post');

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
});

// server.applyMiddleware(morgan('short'))

// connecting to mongoDB atlas
mongoose
	.connect(process.env.DB, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to DB'))
	.catch((err) => console.log(err));

server
	.listen({
		port: 5000,
	})
	.then((res) => {
		console.log(`Server is running at port ${res.url}`);
	});
