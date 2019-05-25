import {
    ADD_DATA_FAILURE,
    ADD_DATA_REQUEST,
    ADD_DATA_SUCCESS,
    FETCH_DATA_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_GALLERY_SUCCESS,
    FETCH_GALLERIES_SUCCESS
} from "../actions/actionTypes";

const initialState = {
    galleries: [],
    photo: {},
    loading: true,
    error: null
};

const galleriesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {...state, loading: true};

        case FETCH_DATA_FAILURE:
            return {...state, loading: false, error: action.error};

        case FETCH_GALLERIES_SUCCESS:
            return {...state, loading: false, galleries: action.galleries};

        case FETCH_GALLERY_SUCCESS:
            return {...state, loading: false, photo: action.photo};

        case ADD_DATA_REQUEST:
            return {...state, loading: true};

        case ADD_DATA_FAILURE:
            return {...state, loading: false, error: action.error};

        case ADD_DATA_SUCCESS:
            return {...state, error: null};

        default:
            return state
    }
};

export default galleriesReducer;