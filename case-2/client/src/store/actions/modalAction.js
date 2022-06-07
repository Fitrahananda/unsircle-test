import { MODAL_FORM } from "../actions/actionType";

export const setModalShow = function (payload) {
  return {
    type: MODAL_FORM,
    payload,
  };
};
