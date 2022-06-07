import {
  FATCH_ITEM_SUCCESS,
  FATCH_ITEMBYID_SUCCESS,
} from "../actions/actionType";

let initialState = {
  itemList: false,
  itemById: false,
};

function itemReducer(state = initialState, action) {
  switch (action.type) {
    case FATCH_ITEM_SUCCESS:
      return {
        ...state,
        itemList: action.payload,
      };

    case FATCH_ITEMBYID_SUCCESS:
      return {
        ...state,
        itemById: action.payload,
      };

    default:
      return state;
  }
}

export default itemReducer;
