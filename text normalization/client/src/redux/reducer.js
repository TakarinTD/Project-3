import {combineReducers} from 'redux';
// import auth, { initialState as authInitialState } from './auth/reducer';
import items from "./main/crudItem"
import stt from "./main/sttModal"
export const reducers = combineReducers({
    items : items,
    stt : stt
});

// export const initialState = {
//   auth: authInitialState,
// };


