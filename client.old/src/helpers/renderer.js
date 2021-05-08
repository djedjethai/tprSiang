import React from 'react';
// const renderToString  = require('react-dom/server').renderToString;
import { renderToString } from 'react-dom/server';

// import App from '../client/App';

// const Home = require('./client/components/Home').default;
import { StaticRouter } from 'react-router-dom';
import Routes from '../client/Routes';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import serialize from 'serialize-javascript';
// import { Helmet } from 'react-helmet';
// the react 'BrowserRouter' mangage the routing of the app
// but as the server manage the rendering (at least the imediate rendering)
// the server need to match its routes following the client side. 
// that is for this 'StaticRouter' implementtation
//
// the context which has been created in the index.js store will be pass down to all our render components 


export default (req, store, context) => {
	
	const content = renderToString(
 		<Provider store={store}>
 			<StaticRouter location={req.path} context={context}>
 				<div>{renderRoutes(Routes)}</div>
 			</StaticRouter>
 		</Provider>
 	);

 	// add here the helmet staff for seo, see prof exemple
	return `
		<html>
			<head>
			<link rel="stylesheet" type="text/css" href="style.css"
			</head>
			<body>
				<div id="root">${content}</div>
				<script>
					window.INITIAL_STATE = ${serialize(store.getState())}
				</script>
				<script src="bundle.js"></script>
			</body>
		</html>
	`;
	
} 
