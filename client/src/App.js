import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import MenuBar from './components/MenuBar';
import Register from './components/Register';
import { Container } from 'semantic-ui-react';

function App() {
	return (
		<BrowserRouter>
			<Container>
				<MenuBar />
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
			</Container>
		</BrowserRouter>
	);
}

export default App;
