import React, { useEffect, useState } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function PostCard({
	post: { id, body, username, createdAt, likeCount, commnetCount, likes },
}) {
	const [seed, setSeed] = useState('');
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);
	function likePost() {
		console.log('like post!!!');
	}
	function likeComment() {
		console.log('Comment created!!!');
	}
	return (
		<Card fluid>
			<Card.Content>
				<Image
					floated="right"
					size="mini"
					src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
				/>
				<Card.Header>{username}</Card.Header>
				<Card.Meta as={Link} to={`/posts/${id}`}>
					{moment({ createdAt }).fromNow(true)}
				</Card.Meta>
				<Card.Description>{body}</Card.Description>
			</Card.Content>
			<Card.Content extra>
				<Button as="div" labelPosition="right">
					<Button color="red" basic onClick={likePost}>
						<Icon name="heart" />
					</Button>
					<Label as="a" basic color="red" pointing="left">
						{likeCount}
					</Label>
				</Button>
				<Button as="div" labelPosition="right">
					<Button color="blue" basic onClick={likeComment}>
						<Icon name="comments" />
					</Button>
					<Label as="a" basic color="blue" pointing="left">
						{commnetCount}
					</Label>
				</Button>
			</Card.Content>
		</Card>
	);
}

export default PostCard;
