const { gql } = require('apollo-server');

module.exports = gql`
	type Post {
		id: ID!
		body: String!
		username: String!
		createdAt: String!
		comments: [Comment]!
		likes: [Like]!
	}

	type Comment {
		id: ID!
		username: String!
		body: String!
		createdAt: String!
	}

	type Like {
		id: ID!
		username: String!
		createdAt: String!
	}

	type User {
		id: ID!
		email: String!
		token: String!
		username: String!
		createdAt: String!
	}

	input RegisterInput {
		username: String!
		password: String!
		confirmPassword: String!
		email: String!
	}
	input LoginInput {
		username: String!
		password: String!
	}

	type Query {
		getPosts: [Post]
		getPost(postId: ID!): Post!
	}

	type Mutation {
		register(registerInput: RegisterInput): User!
		login(loginInput: LoginInput): User!
		createPost(body: String!): Post!
		deletePost(postId: ID!): String!
		createComment(postId: ID!, body: String!): Post!
		deleteComment(postId: ID!, commnetId: ID!): Post!
		likePost(postId: ID!): Post!
	}
`;
