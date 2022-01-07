import { reducer } from "../reducers/cartReducer"
import { createStore } from 'redux';
//tao ra store
export const store=createStore(reducer)