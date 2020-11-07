import React from 'react';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';

function DeleteButton({ post: { id } }) {
	const [confirmOpen, setConformOpen] = useState(false);
	const [deletePost] = useMutation(DELETE_POST_MUTATION, {
		update() {
			setConformOpen(false);
		},
		variables: {
			postId: id,
		},
	});
	return (
		<>
			<Button
				as="div"
				color="green"
				floated="right"
				onClick={() => setConformOpen(true)}
			>
				<Icon name="trash" style={{ margin: 0 }} />
			</Button>
			<Confirm
				open={confirmOpen}
				onCancel={() => setConformOpen(false)}
				onConfirm={deletePost}
			/>
		</>
	);
}

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;

export default DeleteButton;
