import {
  FATCH_MENU_SUCCESS,
  FATCH_MENUBYID_SUCCESS,
} from "../actions/actionType";

let initialState = {
  menuList: false,
  menuById: false,
};

function menuReducer(state = initialState, action) {
  switch (action.type) {
    case FATCH_MENU_SUCCESS:
      return {
        ...state,
        menuList: action.payload,
      };

    case FATCH_MENUBYID_SUCCESS:
      return {
        ...state,
        menuById: action.payload,
      };

    default:
      return state;
  }
}

export default menuReducer;
