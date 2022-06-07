import {
  FATCH_COMPANY_SUCCESS,
  FATCH_COMPANYBYID_SUCCESS,
  MODAL_FORM,
} from "../actions/actionType";

let initialState = {
  companyData: false,
  modalShow: false,
  companyById: false,
};

function companyReducer(state = initialState, action) {
  switch (action.type) {
    case FATCH_COMPANY_SUCCESS:
      console.log(action);
      return {
        ...state,
        companyData: action.payload,
      };
    case MODAL_FORM:
      return {
        ...state,
        modalShow: action.payload,
      };
    case FATCH_COMPANYBYID_SUCCESS:
      return {
        ...state,
        companyById: action.payload,
      };

    default:
      return state;
  }
}

export default companyReducer;
