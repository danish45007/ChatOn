const postsResolver = require('./post');
const usersResolvers = require('./user');
const commentResolver = require('./comment');
const likeResolver = require('./like');

module.exports = {
	Query: {
		...postsResolver.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...postsResolver.Mutation,
		...commentResolver.Mutation,
		...likeResolver.Mutation,
	},
};
