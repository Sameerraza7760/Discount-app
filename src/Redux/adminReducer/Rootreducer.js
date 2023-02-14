import { combineReducers } from "redux";

import adminReducer from './adminReducer'
import adminItemsReducer from "./adminItemsReducer";

const reducer=combineReducers({
 adminReducer,
 adminItemsReducer
})
export default reducer