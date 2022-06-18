import * as actionTypes from './constants/actionTypes';

export const addShop = (data) => {
    return {
        type : actionTypes.ADD_SHOP,
        payload : data
    }
}


export const deleteShop = (data) => {
    return {
        type : actionTypes.DELETE_SHOP,
        payload : data
    }
}