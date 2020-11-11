const { UserInputError, AuthenticationError } = require('apollo-server');
const Post = require('../../models/Post');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
	Mutation: {
		// create commet to the existing post
		createComment: async (_, { postId, body }, context) => {
			// loggedIn
			const { username } = checkAuth(context);
			if (body.trim() === '') {
				throw (
					(UserInputError('Empty comment'),
					{
						error: {
							body: 'Comment body must not be empty',
						},
					})
				);
			}
			const post = await Post.findById(postId);
			// console.log(post);
			if (post) {
				post.comments.unshift({
					body,
					username,
					createdAt: new Date().toISOString(),
				});
				await post.save();
				return post;
			} else {
				throw new UserInputError('Post not found');
			}
		},

		// delete commnet
		deleteComment: async (_, { postId, commnetId }, context) => {
			// logged user
			const { username } = checkAuth(context);
			// console.log(username);
			const post = await Post.findById(postId);
			if (post) {
				const commentIndex = post.comments.findIndex((c) => c.id === commnetId);
				if (post.comments[commentIndex].username === username) {
					post.comments.splice(commentIndex, 1);
					await post.save();
					return post;
				} else {
					throw new AuthenticationError('Action not allowed');
				}
			} else {
				throw new UserInputError('Post not found');
			}
		},
	},
};
