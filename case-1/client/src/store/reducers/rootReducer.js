import { combineReducers } from "redux";

import companyReducer from "./companyReducer";
import itemReducer from "./itemReducer";
import transactionReducer from "./transactionReducer";
const rootReducer = combineReducers({
  company: companyReducer,
  item: itemReducer,
  transaction: transactionReducer,
});

export default rootReducer;
