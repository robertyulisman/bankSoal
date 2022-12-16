import { GET_PROFILE } from "../types";

const initialState = {
  user: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
