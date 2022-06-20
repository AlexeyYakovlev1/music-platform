import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import audioReducer from "./reducers/audio.reducer";
import userReducer from "./reducers/user.reducer";

const allReducers = combineReducers({
    audio: audioReducer,
    user: userReducer
});

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;