import {
  ADD_ADMIN,
  GET_ADMIN,
  EDIT_ADMIN,
  RESET_ADMIN,
  DELETE_ADMIN,
} from "../types";

const initialState = {
  data: [],
  isSuccess: false,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_ADMIN:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case EDIT_ADMIN:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case DELETE_ADMIN:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case RESET_ADMIN:
      return {
        ...state,
        isSuccess: false,
        isError: false,
      };
    default:
      return state;
  }
}
