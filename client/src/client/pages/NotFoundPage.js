import React from 'react';

// staticContext is the context proprs, which has been rename internally by the router
// we need to default the value as an empty object, as in the client server this context won t appear (un truc comme ca..) 
// const NotFoundPage = ({staticContext = {}}) => {
const NotFoundPage = () => {
	// in case of err, we set the value of the context, which will be exploitable in the index.js
	// staticContext.notFound = true;
	return <h2>Oooops, route not found</h2>
}

export default {
	component: NotFoundPage
}

