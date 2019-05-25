import {createStore, applyMiddleware, compose, combineReducers} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createBrowserHistory} from "history";
import {connectRouter, routerMiddleware} from "connected-react-router";

import {saveToLocalStorage, loadFromLocalStorage} from "./localStorage";
import usersReducer from '../store/reducers/usersReducer';
import galleriesReducer from '../store/reducers/galleriesReducer';
import axios from '../axios-api';

export const history = createBrowserHistory();

const rootReducer = combineReducers({
    router: connectRouter(history),
    users: usersReducer,
    galleries: galleriesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
    thunkMiddleware,
    routerMiddleware(history)
];

const enhancers = composeEnhancers(applyMiddleware(...middleware));

const persistedSate = loadFromLocalStorage();

const store = createStore(rootReducer, persistedSate, enhancers);

store.subscribe(() => {
    saveToLocalStorage({
        users: {
            user: store.getState().users.user,
        }
    });
});

axios.interceptors.request.use(config => {
    try {
        config.headers['Authorization'] = store.getState().users.user.token;
    } catch (e) {
        // do nothing, user is not logged in
    }
    return config;
});

export default store;

