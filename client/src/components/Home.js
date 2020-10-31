import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react';
import PostCard from './PostCard';
import Loader from 'react-loader-spinner';

function Home() {
	const { loading, data } = useQuery(fetchData);
	const style = {
		position: 'fixed',
		top: '50%',
		left: '50%',
	};
	// if (data) {
	// 	console.log(data.getPosts);
	// }

	return (
		<Grid columns={3}>
			<Grid.Row className="page__title">
				<h1>
					<b style={{ fontFamily: 'Abril Fatface', color: 'grey' }}>
						Recent Posts
					</b>
				</h1>
			</Grid.Row>
			<Grid.Row>
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
					data.getPosts &&
					data.getPosts.map((post) => (
						<Grid.Column key={post.id}>
							<PostCard post={post} />
						</Grid.Column>
					))
				)}
			</Grid.Row>
		</Grid>
	);
}

const fetchData = gql`
	{
		getPosts {
			id
			body
			username
			createdAt
			likeCount
			commnetCount
			comments {
				username
				body
			}
			likes {
				username
			}
		}
	}
`;

export default Home;
