import axios from "axios";
import {
  GET_PELAJARAN,
  ADD_PELAJARAN,
  RESET_PELAJARAN,
  DELETE_PELAJARAN,
  EDIT_PELAJARAN,
} from "../types";
import { apiUrl } from "@/services/api";

export const getPelajaran = () => (dispatch) => {
  axios
    .get(`/api/pelajaran`)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_PELAJARAN,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`err get data pelajaran`, err);
    });
};
export const addPelajaran = (form) => (dispatch) => {
  axios
    .post(`/api/pelajaran`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil ditambahkan`, "success");
      dispatch({
        type: ADD_PELAJARAN,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data admin`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: ADD_PELAJARAN,
        isSuccess: false,
        isError: true,
      });
    });
};
export const editPelajaran = (id, form) => (dispatch) => {
  axios
    .put(`/api/pelajaran/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil di edit`, "success");
      dispatch({
        type: EDIT_PELAJARAN,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data pelajaran`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: EDIT_PELAJARAN,
        isSuccess: false,
        isError: true,
      });
    });
};
export const deletePelajaran = (id, form) => (dispatch) => {
  axios
    .delete(`/api/pelajaran/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil dihapus`, "success");
      dispatch({
        type: DELETE_PELAJARAN,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data pelajaran`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: DELETE_PELAJARAN,
        isSuccess: false,
        isError: true,
      });
    });
};
export const resetPelajaran = () => (dispatch) => {
  dispatch({
    type: RESET_PELAJARAN,
  });
};
