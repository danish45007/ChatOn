import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { fetchData } from '../utils/graphql';

function PostForm() {
	const [errors, setErrors] = useState({});

	const [value, setValue] = useState({
		body: '',
	});
	const onChange = (event) => {
		setValue({ ...value, [event.target.name]: event.target.value });
	};
	const [createPost] = useMutation(CREATE_POST, {
		variables: value,
		// refetching the data from get all post
		refetchQueries: [{ query: fetchData }],
		update(proxy, result) {
			const data = proxy.readQuery({
				query: fetchData,
			});

			proxy.writeQuery({
				query: fetchData,
				data: {
					getPosts: [result.data.createPost, ...data.getPosts],
				},
			});
			value.body = '';
		},
		onError(err) {
			// console.log(err.graphQLErrors[0].extensions.exception.stacktrace[0]);
			setErrors(err.graphQLErrors[0].message);
			// console.log(errors);
		},
	});
	const onSubmit = (event) => {
		event.preventDefault();
		createPost();
	};

	return (
		<div>
			<Form onSubmit={onSubmit}>
				<h2
					style={{
						fontFamily: 'Abril Fatface',
						color: 'grey',
						textAlign: 'center',
					}}
				>
					Create Posts...
				</h2>
				<Form.Input
					placeholder="Hello wrold..."
					type="text"
					name="body"
					onChange={onChange}
					value={value.body}
					error={errors.body ? true : false}
				/>
				<Button type="submit" color="teal">
					Create Post
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message" style={{ marginBottom: 20 }}>
					<ul className="list">
						<li key={errors}>{errors}</li>
					</ul>
				</div>
			)}
		</div>
	);
}

const CREATE_POST = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
		}
	}
`;

export default PostForm;
