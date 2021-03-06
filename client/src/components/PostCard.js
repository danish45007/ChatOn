import React, { useEffect, useState } from 'react';
import { Card, Icon, Label, Image, Button } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';
import PopupToolTip from '../utils/PopupToolTip';

function PostCard({
	post: { id, body, username, createdAt, likeCount, commnetCount, likes },
}) {
	const { user } = useContext(AuthContext);
	const [seed, setSeed] = useState('');
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);
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
				<LikeButton user={user} post={{ id, likeCount, likes }} />
				<PopupToolTip
					inverted
					content="Add Comment to Post"
					trigger={
						<Button as="div" labelPosition="right">
							<Button color="blue" basic as={Link} to={`/posts/${id}`}>
								<Icon name="comments" />
							</Button>
							<Label as="a" basic color="blue" pointing="left">
								{commnetCount}
							</Label>
						</Button>
					}
				/>

				{user && user.username === username && <DeleteButton post={{ id }} />}
			</Card.Content>
		</Card>
	);
}

export default PostCard;
