const postsResolver = require('./post');
const usersResolvers = require('./user');

module.exports = {
	Query: {
		...postsResolver.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
	},
};
