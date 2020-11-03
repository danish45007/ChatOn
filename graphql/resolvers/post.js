const Posts = require('../../models/Post');
const { UserInputError, AuthenticationError } = require('apollo-server');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
	Query: {
		// get all the post
		async getPosts() {
			try {
				const posts = await Posts.find().sort({ createdAt: -1 });
				// console.log(posts);
				return posts;
			} catch (err) {
				console.log(err);
			}
		},

		// get post by id
		async getPost(_, { postId }) {
			try {
				const post = await Posts.findById(postId);
				// console.log(postId);
				if (post) {
					return post;
				} else {
					throw new UserInputError('Post not found');
				}
			} catch (err) {
				console.log(err);
				throw new Error(err);
			}
		},
	},
	Mutation: {
		// create post method
		async createPost(_, { body }, context) {
			// check is the message body is empty
			if (body.trim() === '') {
				throw new Error('Post body must not be empty');
			}
			// verified user
			const user = checkAuth(context);
			console.log(user);
			// post payload
			const newPost = new Posts({
				body,
				user: user.id,
				username: user.username,
				createdAt: new Date().toISOString(),
			});

			// saving the post
			const post = await newPost.save();
			context.pubsub.publish('NEW_POST', {
				newPost: post,
			});
			return post;
		},
		// delete post
		async deletePost(_, { postId }, context) {
			const user = checkAuth(context);

			try {
				const post = await Posts.findById(postId);
				console.log(post);
				if (user.username === post.username) {
					await post.delete();
					return `Post with postId ${postId} has been deleted successfully`;
				} else {
					throw new AuthenticationError('You are not the Authorized user');
				}
			} catch (err) {
				console.log(err);
				throw new Error(err);
			}
		},
	},
	Subscription: {
		newPost: {
			subscribe: (_, __, { pubsub }) => {
				return pubsub.asyncIterator('New_POST');
			},
		},
	},
};
