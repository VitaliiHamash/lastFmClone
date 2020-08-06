import {createStore, combineReducers, applyMiddleware} from 'redux';
import searchReducer from './reducers/searchReducer';
import listReducer from './reducers/listReducer';
import detailReducer from './reducers/detailReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  searchReducer: searchReducer,
  listReducer: listReducer,
  detailReducer: detailReducer,
});

const configureStore = () =>
  createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
