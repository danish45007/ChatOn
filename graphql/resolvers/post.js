const Posts = require('../../models/Post');
const { UserInputError } = require('apollo-server');
const checkAuth = require('../../utils/checkAuth');

module.exports = {
	Query: {
		async getPosts() {
			try {
				const posts = await Posts.find();
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
        async createPost(_, { body }, context) {
            // verified user
            const user = checkAuth(context)
            console.log(user)
            // post payload
            const newPost = new Posts({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })

            // saving the post
            const post = await newPost.save();
            return post
        }
    }
};
