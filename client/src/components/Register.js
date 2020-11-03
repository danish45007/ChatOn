import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Loader from 'react-loader-spinner';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
const REGISTER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			token
			createdAt
		}
	}
`;

function Register(props) {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});
	const [value, setValue] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});
	const onChange = (event) => {
		setValue({ ...value, [event.target.name]: event.target.value });
	};

	const [addUser, { loading }] = useMutation(REGISTER, {
		update(proxy, result) {
			console.log(result.data.login);
			props.history.push('/');
			context.login(result.data.login);
		},
		onError(err) {
			console.log(err.graphQLErrors[0].extensions.exception.errors);
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: value,
	});

	const onSubmit = (event) => {
		event.preventDefault();
		addUser();
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
					Register
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
					label="Email"
					placeholder="Email"
					type="text"
					name="email"
					value={value.email}
					error={errors.email ? true : false}
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
				<Form.Input
					label="Conform Password"
					placeholder="Conform Password"
					type="password"
					name="confirmPassword"
					autoComplete="on"
					value={value.confirmPassword}
					error={errors.username ? true : false}
					onChange={onChange}
				/>
				<Button type="submit" primary>
					Submit
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

export default Register;
