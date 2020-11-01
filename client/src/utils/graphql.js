import gql from 'graphql-tag';

export const fetchData = gql`
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
