import {
    FETCH_STREAM,
    FETCH_STREAMS,
    EDIT_STREAM,
    DELETE_STREAM,
    CREATE_STREAM
} from "../actions/types";
import _ from 'lodash';

const INITIAL_STATE = {};

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {

        case FETCH_STREAM:
            return {...state, [action.payload.id]: action.payload };
        case FETCH_STREAMS:
            return {...state, ..._.mapKeys(action.payload, 'id')};
        case EDIT_STREAM:
            // uses key interpolation syntax
            return { ...state, [action.payload.id]: action.payload };
        case DELETE_STREAM:
            return _.omit(state, action.payload);
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
}