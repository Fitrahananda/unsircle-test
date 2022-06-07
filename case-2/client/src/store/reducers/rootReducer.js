import { combineReducers } from "redux";

import companyReducer from "./companyReducer";
import menuReducer from "./menuReducer";
import orderReducer from "./orderReducer";
const rootReducer = combineReducers({
  company: companyReducer,
  menu: menuReducer,
  order: orderReducer,
});

export default rootReducer;
