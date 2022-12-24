import axios from "axios";
import {
  GET_KELAS,
  ADD_KELAS,
  RESET_KELAS,
  DELETE_KELAS,
  EDIT_KELAS,
} from "../types";
import { apiUrl } from "@/services/api";

export const getKelas = () => (dispatch) => {
  axios
    .get(`/api/kelas`)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_KELAS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`err get data kelas`, err);
    });
};
export const addKelas = (form) => (dispatch) => {
  axios
    .post(`/api/kelas`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil ditambahkan`, "success");
      dispatch({
        type: ADD_KELAS,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data admin`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: ADD_KELAS,
        isSuccess: false,
        isError: true,
      });
    });
};
export const editKelas = (id, form) => (dispatch) => {
  axios
    .put(`/api/kelas/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil di edit`, "success");
      dispatch({
        type: EDIT_KELAS,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data kelas`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: EDIT_KELAS,
        isSuccess: false,
        isError: true,
      });
    });
};
export const deleteKelas = (id, form) => (dispatch) => {
  axios
    .delete(`/api/kelas/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil dihapus`, "success");
      dispatch({
        type: DELETE_KELAS,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data kelas`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: DELETE_KELAS,
        isSuccess: false,
        isError: true,
      });
    });
};
export const resetKelas = () => (dispatch) => {
  dispatch({
    type: RESET_KELAS,
  });
};
