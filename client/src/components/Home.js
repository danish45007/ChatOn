import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid } from 'semantic-ui-react';
import PostCard from './PostCard';
import Loader from 'react-loader-spinner';
import { AuthContext } from '../context/Auth';
import PostForm from './PostForm';
import { useContext } from 'react';
import { fetchData } from '../utils/graphql';

function Home() {
	const { user } = useContext(AuthContext);
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
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
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

export default Home;
