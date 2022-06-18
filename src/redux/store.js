import {configureStore} from '@reduxjs/toolkit';

import shopListReducer from './reducers.js';


const store = configureStore({
    reducer : {Shops : shopListReducer}
})

export default store;