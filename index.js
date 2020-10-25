const Path = require('path');
require('dotenv').config({ path: Path.join(__dirname, `.env.staging`) });
const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typedef');
const resolvers = require('./graphql/resolvers');

const server = new ApolloServer({
	typeDefs: typeDefs,
	resolvers: resolvers,
	// taking the request body from the express
	context: ({ req }) => ({ req }),
});

// connecting to mongoDB atlas
mongoose
	.connect(process.env.DB, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to mongoDB');
		return server.listen(process.env.PORT).then((res) => {
			console.log(`Server is running at port ${res.url}`);
		});
	})
	.catch((err) => console.log(err));


	
