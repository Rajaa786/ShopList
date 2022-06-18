// import { combineReducers } from "redux";
import * as actionTypes from "./constants/actionTypes.js";
let initialstate = [];

let initialize = (list) => {
  initialstate = JSON.parse(list);
};

let listOfShops = localStorage.getItem("shopList");
listOfShops === null || listOfShops === "undefined"
  ? console.log("LocalStorage " + listOfShops)
  : initialize(listOfShops);

// console.log(initialstate);
// let initialstate = {
//   shops: [
//     {
//       name: "Grocer's Place",
//       area: "Thane",
//       category: "Grocery",
//       openDate: "",
//       closeDate: "",
//     },

//     // {
//     //   name: "The Butcher's Shop",
//     //   area: "Mumbai Suburban",
//     //   category: "Butcher",
//     //   openDate: "",
//     //   closeDate: "",
//     // },
//   ],
// };

const shopListReducer = (state = initialstate, { type, payload }) => {
  
  switch (type) {
    case actionTypes.ADD_SHOP:
      return [...state, payload];

    case actionTypes.DELETE_SHOP:
      return [...state.slice(0, payload), ...state.slice(payload + 1)];

    default:
      return state;
  }
};

export default shopListReducer;
