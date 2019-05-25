import axios from '../../axios-api';
import {push} from 'connected-react-router';
import {NotificationManager} from 'react-notifications';

import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    DELETE_DATA_FAILURE,
    DELETE_DATA_REQUEST,
    DELETE_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_GALLERY_SUCCESS,
    FETCH_GALLERYS_SUCCESS
} from "./actionTypes";

const fetchDataRequest = () => ({type: FETCH_DATA_REQUEST});
const fetchDataFailure = error => ({type: FETCH_DATA_FAILURE, error});

const addDataRequest = () => ({type: ADD_DATA_REQUEST});
const addDataFailure = error => ({type: ADD_DATA_FAILURE, error});
const addDataSuccess = () => ({type: ADD_DATA_SUCCESS});

const deleteDataRequest = () => ({type: DELETE_DATA_REQUEST});
const deleteDataFailure = error => ({type: DELETE_DATA_FAILURE, error});
const deleteDataSuccess = () => ({type: DELETE_DATA_SUCCESS});

const fetchCocktailsSuccess = photos => ({type: FETCH_GALLERYS_SUCCESS, photos});
const fetchCocktailSuccess = photo => ({type: FETCH_GALLERY_SUCCESS, photo});

export const fetchGallery = () => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get('/gallery');
            dispatch(fetchCocktailsSuccess(response.data));
        } catch (e) {
            dispatch(fetchDataFailure(e));
        }
    }
};

export const fetchPhoto = photoId => {
    return async dispatch => {
        dispatch(fetchDataRequest());

        try {
            const response = await axios.get(`/gallery/${photoId}`);
            dispatch(fetchCocktailSuccess(response.data));
        } catch (e) {
            NotificationManager.error(e.response.data.message);
            dispatch(fetchDataFailure(e));
        }
    }
};

export const addPhoto = photoData => {
    return async dispatch => {
        dispatch(addDataRequest());

        try {
            const response = await axios.post('/gallery', photoData);

            dispatch(addDataSuccess());
            NotificationManager.success(response.data.message);
            dispatch(push('/'))
        } catch (e) {
            dispatch(addDataFailure(e.response.data));
        }
    }
};

export const deletePhoto = photoId => {
    return async dispatch => {
        dispatch(deleteDataRequest());

        try {
            const response = await axios.delete(`/gallery/${photoId}`);

            dispatch(deleteDataSuccess());
            dispatch(fetchGallery());
            NotificationManager.success(response.data.message);
            dispatch(push('/'));
        } catch (e) {
            NotificationManager.error(e.response.data.message);
            dispatch(deleteDataFailure(e));
        }
    }
};

