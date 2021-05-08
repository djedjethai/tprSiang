import { FETCH_MAINPAGE, INTOHEAD_PROGRAMINGMINDSET } from '../actions';

export const reducerFetchMainpage = (state = [], action) => {
	switch (action.type) {
		case FETCH_MAINPAGE:
			return action.payload.data						
		default:
			return state;
	};
}; 

export const reducerIntoheadProgramingmindset = (state = [], action) => {
	switch (action.type) {
		case INTOHEAD_PROGRAMINGMINDSET:
			console.log('reduc prograing minset')
		console.log(action.payload.data);
			return action.payload.data;
		default:
			return state;
	};
};


