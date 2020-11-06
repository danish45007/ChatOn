import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import Register from './components/Register';
import { Container } from 'semantic-ui-react';
import { AuthProvider } from './context/Auth';
import AuthRoute from './utils/AuthRoute';
import SinglePost from './components/SinglePost';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Container>
					<MenuBar />
					<Route exact path="/" component={Home} />
					<AuthRoute exact path="/login" component={Login} />
					<AuthRoute exact path="/register" component={Register} />
					<Route exact path="/posts/:postId" component={SinglePost} />
				</Container>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
