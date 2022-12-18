import axios from "axios";
import {
  GET_KATEGORI,
  ADD_KATEGORI,
  RESET_KATEGORI,
  DELETE_KATEGORI,
  EDIT_KATEGORI,
} from "../types";
import { apiUrl } from "@/services/api";

export const getKategori = () => (dispatch) => {
  axios
    .get(`${apiUrl}/api/kategori`)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_KATEGORI,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`err get data kategori`, err);
    });
};
export const addKategori = (form) => (dispatch) => {
  axios
    .post(`${apiUrl}/api/kategori`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil ditambahkan`, "success");
      dispatch({
        type: ADD_KATEGORI,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data admin`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: ADD_KATEGORI,
        isSuccess: false,
        isError: true,
      });
    });
};
export const editKategori = (id, form) => (dispatch) => {
  axios
    .put(`${apiUrl}/api/kategori/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil di edit`, "success");
      dispatch({
        type: EDIT_KATEGORI,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data kategori`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: EDIT_KATEGORI,
        isSuccess: false,
        isError: true,
      });
    });
};
export const deleteKategori = (id, form) => (dispatch) => {
  axios
    .delete(`${apiUrl}/api/kategori/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil dihapus`, "success");
      dispatch({
        type: DELETE_KATEGORI,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data kategori`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: DELETE_KATEGORI,
        isSuccess: false,
        isError: true,
      });
    });
};
export const resetKategori = () => (dispatch) => {
  dispatch({
    type: RESET_KATEGORI,
  });
};
