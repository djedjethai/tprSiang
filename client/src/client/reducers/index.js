import { combineReducers } from 'redux';
import { reducerFetchMainpage, reducerIntoheadProgramingmindset } from './reducerProject';



export default combineReducers({
        mainpage: reducerFetchMainpage,
        intoheadProgramingmindset: reducerIntoheadProgramingmindset         
});      
