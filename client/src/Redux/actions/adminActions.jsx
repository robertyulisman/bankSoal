import axios from "axios";
import {
  GET_ADMIN,
  ADD_ADMIN,
  RESET_ADMIN,
  DELETE_ADMIN,
  EDIT_ADMIN,
} from "../types";
import { apiUrl } from "@/services/api";

export const getAdmin = () => (dispatch) => {
  axios
    .get(`${apiUrl}/api/admin`)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_ADMIN,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`err get data admin`, err);
    });
};
export const addAdmin = (form) => (dispatch) => {
  axios
    .post(`${apiUrl}/api/admin/register`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal(
        "Good job!",
        `admin, ${res.data.nama} berhasil ditambahkan`,
        "success"
      );
      dispatch({
        type: ADD_ADMIN,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data admin`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: ADD_ADMIN,
        isSuccess: false,
        isError: true,
      });
    });
};
export const editAdmin = (idAdmin, form) => (dispatch) => {
  axios
    .put(`${apiUrl}/api/admin/${idAdmin}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `admin, ${res.data.nama} berhasil di edit`, "success");
      dispatch({
        type: EDIT_ADMIN,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data admin`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: EDIT_ADMIN,
        isSuccess: false,
        isError: true,
      });
    });
};
export const deleteAdmin = (idAdmin, form) => (dispatch) => {
  axios
    .delete(`${apiUrl}/api/admin/${idAdmin}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `admin, ${res.data.nama} berhasil dihapus`, "success");
      dispatch({
        type: DELETE_ADMIN,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data admin`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: DELETE_ADMIN,
        isSuccess: false,
        isError: true,
      });
    });
};
export const resetAdmin = () => (dispatch) => {
  dispatch({
    type: RESET_ADMIN,
  });
};
