import axios from 'axios';

export const FETCH_MAINPAGE = 'fetch_mainpage';
export const fetchMainPage = () => async (dispatch, getState) => {
	console.log('from action, before req, j allucine');
	// const res = await axios.get("http://react-ssr-api.herokuapp.com/users");
	const res = await axios.get("http://localhost:5000/mainpage");

	console.log('from action');
	console.log(res);
	dispatch({
		type: FETCH_MAINPAGE,
		payload: res
	});
};

export const INTOHEAD_PROGRAMINGMINDSET = 'intoheadProgramingmindset';
export const getIntoheadProgramingmindset = () => async (dispatch, getState) => {
	const res = await axios.get("http://react-ssr-api.herokuapp.com/users");

	dispatch({
		type: INTOHEAD_PROGRAMINGMINDSET,
		payload: res
	});
};
