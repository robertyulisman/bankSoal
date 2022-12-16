import axios from "axios";
import { GET_PROFILE } from "../types";
import { apiUrl } from "@/services/api";

// get profile user
export const getUserProfile = (idUser) => (dispatch) => {
  axios
    .get(`${apiUrl}/api/admin/${idUser}`)
    .then((res) => {
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`err`, err);
    });
};
