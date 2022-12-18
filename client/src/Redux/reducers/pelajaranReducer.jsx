import {
  ADD_PELAJARAN,
  GET_PELAJARAN,
  EDIT_PELAJARAN,
  RESET_PELAJARAN,
  DELETE_PELAJARAN,
} from "../types";

const initialState = {
  data: [],
  isSuccess: false,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PELAJARAN:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_PELAJARAN:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case EDIT_PELAJARAN:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case DELETE_PELAJARAN:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case RESET_PELAJARAN:
      return {
        ...state,
        isSuccess: false,
        isError: false,
      };
    default:
      return state;
  }
}
