import { combineReducers } from "redux";

import adminReducer from './adminReducer'
import adminItemsReducer from "./adminItemsReducer";
import cartItemReducer from "../cartitemReducer/cartItemReducer";



const reducer=combineReducers({
 adminReducer,
 adminItemsReducer,
   cartItemReducer,
})
export default reducer