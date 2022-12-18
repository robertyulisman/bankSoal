import {
  ADD_KATEGORI,
  GET_KATEGORI,
  EDIT_KATEGORI,
  RESET_KATEGORI,
  DELETE_KATEGORI,
} from "../types";

const initialState = {
  data: [],
  isSuccess: false,
  isError: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_KATEGORI:
      return {
        ...state,
        data: action.payload,
      };
    case ADD_KATEGORI:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case EDIT_KATEGORI:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case DELETE_KATEGORI:
      return {
        ...state,
        isSuccess: action.isSuccess,
        isError: action.isError,
      };
    case RESET_KATEGORI:
      return {
        ...state,
        isSuccess: false,
        isError: false,
      };
    default:
      return state;
  }
}
