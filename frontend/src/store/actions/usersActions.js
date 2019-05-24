import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from "react-notifications";

import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_SUCCESS
} from "./actionTypes";

const registerUserSuccess = user => ({type: REGISTER_USER_SUCCESS, user});
const registerUserFailure = error => ({type: REGISTER_USER_FAILURE, error});

const loginUserSuccess = user => ({type: LOGIN_USER_SUCCESS, user});
const loginUserFailure = error => ({type: LOGIN_USER_FAILURE, error});

const logoutUserSuccess = () => ({type: LOGOUT_USER_SUCCESS});

export const registerUser = userData => {
    return async dispatch => {
        try {
            const response = await axios.post('/users', userData);

            dispatch(registerUserSuccess(response.data.user));
            dispatch(push('/'));
        } catch (error) {

            if (error.response && error.response.data) {
                dispatch(registerUserFailure(error.response.data));
            } else {
                dispatch(registerUserFailure({global: 'No connection'}));
            }

        }
    };
};

export const loginUser = userData => {
    return async dispatch => {
        try {
            const response = await axios.post('/users/sessions', userData);

            dispatch(loginUserSuccess(response.data.user));
            NotificationManager.success('Logged in via Facebook');
            dispatch(push('/'));
        } catch (error) {
            if (error.response && error.response.data) {
                dispatch(loginUserFailure(error.response.data));
            } else {
                dispatch(loginUserFailure({global: 'No connection'}));
            }
        }
    }
};

export const logoutUser = () => {
    return async dispatch => {

        try {
            const response = await axios.delete('/users/sessions');
            dispatch(logoutUserSuccess());
            NotificationManager.success(response.data.message);
            dispatch(push('/'));
        } catch {
            NotificationManager.error('Could not logout!');
        }
    }
};

export const facebookLogin = userData => {
    return dispatch => {
        return axios.post('/users/facebookLogin', userData).then(
            response => {
                dispatch(loginUserSuccess(response.data.user));
                NotificationManager.success('Logged in via Facebook');
                dispatch(push('/'));
            },
            () => {
                dispatch(loginUserFailure('Login via Facebook failed'));
            }
        )
    }
};