import React from 'react';
import App from './App';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';

// creating the single end-point of server
const httpLink = createHttpLink({
	uri: ' http://localhost:8000/',
});

const client = new ApolloClient({
	link: httpLink,
	headers: { authorization: `bearer [token]` },
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);
