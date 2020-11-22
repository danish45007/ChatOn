const Path = require('path');
require('dotenv').config({ path: Path.join(__dirname, `.env.staging`) });
const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const {
	validateRegesterInput,
	validateLoginUser,
} = require('../../utils/validators');

const genratetoken = async (user) => {
	return await jwt.sign(
		{
			id: user.id,
			username: user.username,
			email: user.email,
		},
		process.env.SECRET,
		{ expiresIn: '1h' }
	);
};

module.exports = {
	Mutation: {
		// register mutation
		async register(
			_,
			{ registerInput: { username, password, email, confirmPassword } },
			context,
			info
		) {
			// TODO: Validate user data
			const { errors, valid } = validateRegesterInput(
				username,
				email,
				password,
				confirmPassword
			);
			if (!valid) {
				throw new UserInputError('Error', {
					errors,
				});
			}
			// TODO: Make sure user doesn't exists already

			const user = await User.findOne({ username });
			if (user) {
				throw new UserInputError('username is taken', {
					error: {
						username: 'This username is taken',
					},
				});
			}

			// TODO: Hash passwords before storing & create auth token

			// encrypting password uisng hash function with 12 rounds
			password = await bcrypt.hash(password, 12);

			// creating a new user obj to store the modified values
			const newUser = new User({
				email,
				username,
				password,
				createdAt: new Date().toISOString(),
			});

			// storing the new user onto the database
			const res = await newUser.save();

			// creating a webtoken for auth
			const token = genratetoken(res);
			// return data back to user
			console.log(res);
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},

		// login mutation
		async login(_, { loginInput: { username, password } }, context, info) {
			// field validation check
			const { errors, valid } = validateLoginUser(username, password);

			if (!valid) {
				throw new UserInputError('Error', {
					errors,
				});
			}

			const user = await User.findOne({ username });
			// console.log(user.password)

			// check is user exist's
			if (!user) {
				errors.findError = 'user not found';
				throw new UserInputError('User not found', {
					errors,
				});
			}
			// checking the password
			const match = await bcrypt.compare(password, user.password);
			if (!match) {
				errors.creds = 'wrong credentials';
				throw new UserInputError('Wrong credentials', { errors });
			}

			// creating token
			const token = genratetoken(user);
			return {
				...user._doc,
				id: user._id,
				token,
			};
		},
	},
};
