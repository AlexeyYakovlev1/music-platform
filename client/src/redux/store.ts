import { applyMiddleware, combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import audioReducer from "./reducers/audio.reducer";

const allReducers = combineReducers({
    audio: audioReducer
});

const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)));

export default store;