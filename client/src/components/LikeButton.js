import React from 'react';
import { Icon, Label, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
function LikeButton({ user, post: { id, likeCount, likes } }) {
	const [liked, setLiked] = useState(false);
	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);

	// using the mutation
	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
		onError(err) {
			console.log(err);
		},
		errorPolicy: 'ignore',
	});

	const likeButton = user ? (
		liked ? (
			<Button color="red">
				<Icon name="heart" />
			</Button>
		) : (
			<Button color="red" basic>
				<Icon name="heart" />
			</Button>
		)
	) : (
		<Button color="red" as={Link} to="/login" basic>
			<Icon name="heart" />
		</Button>
	);

	return (
		<Button as="div" labelPosition="right" onClick={likePost}>
			{likeButton}
			<Label as="a" basic color="red" pointing="left">
				{likeCount}
			</Label>
		</Button>
	);
}

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default LikeButton;
