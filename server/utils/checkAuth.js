const jwt = require('jsonwebtoken');
const Path = require('path');
const { AuthenticationError } = require('apollo-server');

require('dotenv').config({ path: Path.join(__dirname, `.env.staging`) });

module.exports = (context) => {
	// context = {...., headers}
	const authHeader = context.req.headers.authorization;
	if (authHeader) {
		// get the token fron the auth header ...Bearer "xyxyxy"
		const token = authHeader.split('Bearer ')[1];
		if (token) {
			// check if the token expire
			try {
				const user = jwt.verify(token, process.env.SECRET);
				return user;
			} catch (err) {
				throw new AuthenticationError('Invaild/Expired token', { token });
			}
		}
		throw new Error(`Authentication token must be 'Bearer[token]`);
	}
	throw new Error('Authorization Header must be provided');
};
