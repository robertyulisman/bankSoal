import {
  ADD_SOAL,
  GET_SOAL,
  EDIT_SOAL,
  RESET_SOAL,
  DELETE_SOAL,
} from "../types";

const initialState = {
  data: [],
  isSuccess: false,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SOAL:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_SOAL:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case EDIT_SOAL:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case DELETE_SOAL:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case RESET_SOAL:
      return {
        ...state,
        isSuccess: false,
        isError: false,
      };
    default:
      return state;
  }
}
