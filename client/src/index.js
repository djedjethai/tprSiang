// permet a babel d'utiliser les modules necessaires a utiliser async-await
import 'babel-polyfill';
import express from 'express';
import renderer from './helpers/renderer';
import createStore from './helpers/createStore';
// to set the special routing
import { matchRoutes } from 'react-router-config';
// import proxy from 'express-http-proxy';
import Routes from './client/Routes';

const app = express();

// this middleware will pass all request with '/api' directly to that domain
// the second option {proxyReqOptDeco...} n est pas obligatoire. 
// C pour the oauth process to redirect the authenticate user to 'localhost:3000'
// so the auth flow of this app is working with google oauth via 'react-ssr-api.herokuapp.com'
// then we fix the '/api' in the axios instance (src/client/client.js)
// app.use('/api', proxy('http://react-ssr-api.herokuapp.com', {
// 	proxyReqOptDecorator(opts) {
// 		opts.headers['x-forwarded-host'] = 'localhost:3000';
// 		return opts;
// 		}
// 	})
// );


app.use(express.static('public'));


// as 'public folder is static', the express will automaticly pick the files there <script src="bundle.js"> 
// we pass the req in argument to the store to get the cookies data, 
// which we gonna atach them (via the proxy) to the api (here heroku) 
app.get('*', (req, res) => {
	const store = createStore(req);
	
	const promises = matchRoutes(Routes, req.path).map(({route}) => {
		// need this check as some routes(Components) won\'t have any function to load 
		// IF route.loadData WHICH COME FROM THE PAGE COMPONENT, declenche le dipatch(d'action creatore)  
		return route.loadData ? route.loadData(store) : null;

		// here we iterate over the map(), mean that gonna be apply to each route
		})
		.map(promise => {
			if (promise) {
				return new Promise((resolve, reject) => {
					promise.then(resolve).catch(resolve);
				});
			}
		});
	
	// we resolves the promises\'s array, then we know our especting datas should be here
	// and procede the rendering, BUT if one fail the all rendering fail, so need a .catch()
	Promise.all(promises).then(() => {
		// declare and pass the context obj, which we will use to get the Error report
		const context = {};
		// we pass the imported helper function, which gonna render the html for any page
		const content = renderer(req, store, context);
		// in the context appear the redirect routes from react-router, 
		// so as we did redirect from react (in case of non auth user)
		// here we redirect from the server as well
		if (context.url) {
		 	// statusCode 301 means 'temporary redirected'
		 	return res.redirect(301, context.url);
		 }
		// we can send the status first then the response.
		if (context.notFound) {
			res.status(404);
		}
		res.send(content);
	})
	.catch(e => {
		console.log(e);
	});

});

app.listen(3000, () => {
	console.log('Listening on 3000');
});

