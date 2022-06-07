import {
  FATCH_ORDER_SUCCESS,
  FATCH_ORDERNBYID_SUCCESS,
} from "../actions/actionType";

let initialState = {
  orderList: false,
  orderById: false,
};

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case FATCH_ORDER_SUCCESS:
      console.log(action);
      return {
        ...state,
        orderList: action.payload,
      };

    case FATCH_ORDERNBYID_SUCCESS:
      return {
        ...state,
        orderById: action.payload,
      };

    default:
      return state;
  }
}

export default orderReducer;
