import { combineReducers } from 'redux';
import { reducer as formReducer} from 'redux-form'; // form-reducer that comes with redux-form
import authReducer from './authReducer';
import streamsReducer from './streamsReducer';

export default combineReducers({
    auth: authReducer,
    form: formReducer,
    streams: streamsReducer
});

// redux-form.com
