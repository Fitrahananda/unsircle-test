import { MODAL_FORM } from "../actions/actionType";

let initialState = {
  modalShow: false,
};

function companyReducer(state = initialState, action) {
  switch (action.type) {
    case MODAL_FORM:
      return {
        ...state,
        modalShow: action.payload,
      };
    default:
      return state;
  }
}

export default companyReducer;
