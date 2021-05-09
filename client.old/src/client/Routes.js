import React from 'react';
// import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

import App from './App';
// import NotFoundPage from './pages/NotFoundPage';
// export default () => {
// 	return (
// 		<div>
// 			<Route exact path="/" component={Home} />
// 			<Route exact path="/users" component={UsersList} />
// 			{/*<Route path="/hi" component={() => 'Hi'} />*/}
// 		</div>
// 	);
// };

export default [
	{
			...App,
			routes:[
 				{
					...HomePage,
 					path: '/',
 					exact: true
 				},
				{
					...NotFoundPage
				}
			]
	}
];

