// Startup point for the client side 
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Routes from './Routes';
import reducers from './reducers';
// permet a babel d'utiliser les modules necessaires a utiliser async-await
import 'babel-polyfill';
import App from './App';
import { renderRoutes } from 'react-router-config';
import axios from 'axios';

// create an axios\'s instance which we gonna pass thru the action creator
// this instance will automaticly prepend '/api' before any url passing thru 

// const axiosInstance = axios.create({
// 	// baseURL: '/api'
// })


// the second arg of the object(window.INITIAL_STATE), has been setted up from the server rendering
// and will allow the react re-render to pop up with these datas
// see we pass the axios instance as an extra argument inside the thunk middleware
const store = createStore(
 	reducers, 
 	window.INITIAL_STATE, 
 	applyMiddleware(thunk)
);

// here we render definitivement the react app into the the <div> which has been pre-render from the server
// we select this <div> with the querySelector()
// we are not re-rendering but setting a kind of binding into the html already render from the server
ReactDOM.hydrate(
	<Provider store={store}>
		<BrowserRouter>
			<div>{renderRoutes(Routes)}</div>
		</BrowserRouter>
	</Provider>
	, document.querySelector('#root')
);
