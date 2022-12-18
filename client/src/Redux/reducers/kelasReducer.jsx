import {
  ADD_KELAS,
  GET_KELAS,
  EDIT_KELAS,
  RESET_KELAS,
  DELETE_KELAS,
} from "../types";

const initialState = {
  data: [],
  isSuccess: false,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_KELAS:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_KELAS:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case EDIT_KELAS:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case DELETE_KELAS:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case RESET_KELAS:
      return {
        ...state,
        isSuccess: false,
        isError: false,
      };
    default:
      return state;
  }
}
