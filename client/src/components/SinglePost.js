import React, { useContext } from 'react';
import gql from 'graphql-tag';
import { Button, Card, Grid, Image, Label, Icon } from 'semantic-ui-react';
import { useQuery } from '@apollo/react-hooks';
import Loader from 'react-loader-spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/Auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

function SinglePost(props) {
	const [seed, setSeed] = useState('');
	const { user } = useContext(AuthContext);
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);
	const postId = props.match.params.postId;
	// console.log(postId);
	const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
		variables: {
			postId,
		},
	});
	const style = {
		position: 'fixed',
		top: '50%',
		left: '50%',
	};
	let postMarkup;
	if (loading || !data || error) {
		postMarkup = (
			<Loader
				style={style}
				type="TailSpin"
				color="#FF1493"
				height={100}
				width={100}
				timeout={5000} //5 secs
			/>
		);
	} else {
		const {
			id,
			body,
			createdAt,
			username,
			likes,
			likeCount,
			commnetCount,
		} = data.getPost;
		// console.log(id);
		postMarkup = (
			<Grid>
				<Grid.Row>
					<Grid.Column width={2}>
						<Image
							floated="right"
							size="mini"
							src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
						/>
					</Grid.Column>
					<Grid.Column width={10}>
						<Card fluid>
							<Card.Content>
								<Card.Header>{username}</Card.Header>
								<Card.Meta as={Link} to={`/posts/${id}`}>
									{moment({ createdAt }).fromNow(true)}
								</Card.Meta>
								<Card.Description>{body}</Card.Description>
							</Card.Content>
							<br />
							<Card.Content extra>
								<LikeButton user={user} post={{ id, likeCount, likes }} />
								<Button as="div" labelPosition="right">
									<Button color="blue" basic as={Link} to={`/posts/${id}`}>
										<Icon name="comments" />
									</Button>
									<Label as="a" basic color="blue" pointing="left">
										{commnetCount}
									</Label>
								</Button>
								{user && user.username === username && (
									<DeleteButton post={{ id }} />
								)}
							</Card.Content>
						</Card>
					</Grid.Column>
				</Grid.Row>
			</Grid>
		);
	}

	return postMarkup;
}

const FETCH_POST_QUERY = gql`
	query($postId: ID!) {
		getPost(postId: $postId) {
			id
			username
			body
			createdAt
			likeCount
			likes {
				username
				createdAt
			}
			commnetCount
			comments {
				username
				body
				createdAt
			}
		}
	}
`;

export default SinglePost;
