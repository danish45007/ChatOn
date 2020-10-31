const postsResolver = require('./post');
const usersResolvers = require('./user');
const commentResolver = require('./comment');
const likeResolver = require('./like');
// const subResolver = require('./subcription');
module.exports = {
	Post: {
		likeCount(parent) {
			return parent.likes.length;
		},
		commnetCount(parent) {
			return parent.comments.length;
		},
	},
	Query: {
		...postsResolver.Query,
	},
	Mutation: {
		...usersResolvers.Mutation,
		...postsResolver.Mutation,
		...commentResolver.Mutation,
		...likeResolver.Mutation,
	},
	Subscription: {
		...postsResolver.Subscription,
	},
};
