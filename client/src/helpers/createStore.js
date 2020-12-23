import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../client/reducers';
import axios from 'axios';


// we create an axios instance, like we have done for the client side (src/client/clien.js)
// the req object contenant the cookies data has been pass here in src/index.js
// the || '' inside the headers set the default headers value as empty in case of no cookie
export default (req) => {
	//const axiosInstance = axios.create({
	//}) 


	// as we have done for the setting of the client thunk (see src/client/client.js)
	const store = createStore(reducers, {}, applyMiddleware(thunk));
	
	console.log('ds create store');
	console.log(store.getState());

	return store;
};
