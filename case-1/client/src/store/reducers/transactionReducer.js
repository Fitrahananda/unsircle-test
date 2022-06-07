import {
  FATCH_TRANSACTION_SUCCESS,
  FATCH_TRANSACTIONBYID_SUCCESS,
} from "../actions/actionType";

let initialState = {
  transactionList: [],
  transactionById: false,
};

function transactionReducer(state = initialState, action) {
  switch (action.type) {
    case FATCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        transactionList: action.payload,
      };

    case FATCH_TRANSACTIONBYID_SUCCESS:
      return {
        ...state,
        transactionById: action.payload,
      };

    default:
      return state;
  }
}

export default transactionReducer;
