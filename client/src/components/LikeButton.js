import React from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
function LikeButton({ user: { user }, post: { id, likeCount, likes } }) {
	return (
		<Button as="div" labelPosition="right">
			<Button color="red" basic>
				<Icon name="heart" />
			</Button>
			<Label as="a" basic color="red" pointing="left">
				{likeCount}
			</Label>
		</Button>
	);
}

export default LikeButton;
