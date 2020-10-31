import React from 'react';
import { createContext } from 'react';
import { useReducer } from 'react';
import jwtDecoder from 'jwt-decode';

const initalState = { user: null };

if (localStorage.getItem('jwtToken')) {
	const decodeToken = jwtDecoder(localStorage.getItem('jwtToken'));
	// if expired
	if (decodeToken.exp * 1000 < Date.now()) {
		localStorage.removeItem('jwtToken');
	} else {
		initalState.user = decodeToken;
	}
}

const AuthContext = createContext({
	user: null,
	login: (data) => {},
	logout: () => {},
});

function authReducer(state, action) {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				user: action.payload,
			};
		case 'LOGOUT':
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
}

// using the reducer
function AuthProvider(props) {
	const [state, dispatch] = useReducer(authReducer, initalState);

	// login
	function login(userData) {
		// setting the token into the local storage
		localStorage.setItem('jwtToken', userData.token);
		dispatch({
			type: 'LOGIN',
			payload: userData,
		});
	}

	// logout
	function logout() {
		// remove token
		localStorage.removeItem('jwtToken');
		dispatch({
			type: 'LOGOUT',
		});
	}

	return (
		<AuthContext.Provider
			value={{ user: state.user, login, logout }}
			{...props}
		/>
	);
}

export { AuthContext, AuthProvider };
