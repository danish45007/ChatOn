import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Loader from 'react-loader-spinner';
import { AuthContext } from '../context/Auth';
import { useContext } from 'react';

const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(loginInput: { username: $username, password: $password }) {
			id
			email
			username
			token
			createdAt
		}
	}
`;

function Login(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});
	const [value, setValue] = useState({
		username: '',
		password: '',
	});
	const onChange = (event) => {
		setValue({ ...value, [event.target.name]: event.target.value });
	};

	const [loginUser, { loading }] = useMutation(LOGIN, {
		update(proxy, result) {
			console.log(result);
			context.login(result.data.login);
			props.history.push('/');
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.exception.errors);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: value,
	});

	const onSubmit = (event) => {
		event.preventDefault();
		loginUser();
	};

	const style = {
		position: 'fixed',
		top: '50%',
		left: '50%',
	};

	return (
		<div style={{ margin: 'auto', width: 400 }}>
			<Form onSubmit={onSubmit} noValidate>
				{loading ? (
					<Loader
						style={style}
						type="TailSpin"
						color="#FF1493"
						height={100}
						width={100}
						timeout={5000} //5 secs
					/>
				) : (
					''
				)}
				<h1
					style={{
						fontFamily: 'Abril Fatface',
						color: 'grey',
						textAlign: 'center',
					}}
				>
					Login
				</h1>
				<Form.Input
					label="Username"
					placeholder="Username"
					type="text"
					name="username"
					value={value.username}
					error={errors.username ? true : false}
					onChange={onChange}
				/>

				<Form.Input
					label="Password"
					placeholder="Password"
					type="password"
					name="password"
					autoComplete="on"
					value={value.password}
					error={errors.password ? true : false}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
}

export default Login;
