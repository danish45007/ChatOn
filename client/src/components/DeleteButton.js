import React from 'react';
import { Icon, Button, Confirm } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import { fetchData } from '../utils/graphql';
import PopupToolTip from '../utils/PopupToolTip';

function DeleteButton({ post: { id }, callback, commnetId }) {
	const [confirmOpen, setConformOpen] = useState(false);
	console.log(commnetId);
	const mutation = commnetId ? DELETE_Comment_MUTATION : DELETE_POST_MUTATION;

	const [deletePost] = useMutation(mutation, {
		update(proxy) {
			setConformOpen(false);
			if (!commnetId) {
				const data = proxy.readQuery({
					query: fetchData,
				});
				const resPosts = data.getPosts.filter((p) => p.id !== id);
				proxy.writeQuery({
					query: fetchData,
					data: { getPosts: [...resPosts] },
				});
			}
			// calling callback function if present
			if (callback) {
				callback();
			}
		},
		variables: {
			postId: id,
			commnetId,
		},
	});
	return (
		<>
			<PopupToolTip
				inverted
				content={commnetId ? 'Delete Comment' : 'Delete Post'}
				trigger={
					<Button
						as="div"
						color="green"
						floated="right"
						onClick={() => setConformOpen(true)}
					>
						<Icon name="trash" style={{ margin: 0 }} />
					</Button>
				}
			/>

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

const DELETE_Comment_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commnetId: ID!) {
		deleteComment(postId: $postId, commnetId: $commnetId) {
			id
			comments {
				id
				username
				createdAt
				body
			}
			commnetCount
		}
	}
`;

export default DeleteButton;
