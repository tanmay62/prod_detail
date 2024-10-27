import { legacy_createStore as createStore } from 'redux';
import productReducer from './productReducer';

const store = createStore(productReducer);

export default store;