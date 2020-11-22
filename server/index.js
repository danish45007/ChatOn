const Path = require('path');
require('dotenv').config({ path: Path.join(__dirname, `.env.staging`) });
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typedef');
const resolvers = require('./graphql/resolvers');

// init new pubsub
const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	// taking the request body from the express
	context: ({ req }) => ({ req, pubsub }),
});

// defining the port
const PORT = process.env.PORT || 5500;

// connecting to mongoDB atlas
mongoose
	.connect(process.env.DB, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to mongoDB');
		return server.listen(PORT).then((res) => {
			console.log(`Server is running at port ${res.url}`);
		});
	})
	.catch((err) => console.error(err));
