const Path = require('path');
require('dotenv').config({ path: Path.join(__dirname, `.env.staging`) });
const User = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');
const { validateRegesterInput } = require('../../utils/validators');

module.exports = {
	Mutation: {
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
			const token = await jwt.sign(
				{
					id: res.id,
					username: res.username,
					email: res.email,
				},
				process.env.SECRET,
				{ expiresIn: '1h' }
			);
			// return data back to user
			return {
				...res._doc,
				id: res._id,
				token,
			};
		},
	},
};
