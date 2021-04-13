import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from reducers
import rootReducer from '../reducers';
import thunk from "redux-thunk";

// create store object using rootReducer object
const store = createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk)
));

// export the store object
export default store;