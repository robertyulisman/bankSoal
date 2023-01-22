import axios from "axios";
import {
  GET_SOAL,
  ADD_SOAL,
  RESET_SOAL,
  DELETE_SOAL,
  EDIT_SOAL,
} from "../types";
import { apiUrl } from "@/services/api";
import swal from "sweetalert";

export const getSoal = () => (dispatch) => {
  axios
    .get(`/api/bank_soal`)
    .then((res) => {
      console.log("res.data", res.data);
      dispatch({
        type: GET_SOAL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(`err get data bank_soal`, err);
    });
};
export const addSoal = (idUser, form) => (dispatch) => {
  axios
    .post(`/api/bank_soal/${idUser}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil ditambahkan`, "success");
      dispatch({
        type: ADD_SOAL,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      // swal({
      //   title: "Error",
      //   content: err?.response?.statusText,
      //   icon: "warning",
      //   buttons: true,
      //   dangerMode: true,
      // });
      swal("Uppss", `Error, ${err?.response?.statusText}`, "error");
      console.log("err", err);
      dispatch({
        type: ADD_SOAL,
        isSuccess: false,
        isError: true,
      });
    });
};
export const editSoal = (id, form) => (dispatch) => {
  axios
    .put(`/api/bank_soal/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil di edit`, "success");
      dispatch({
        type: EDIT_SOAL,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data bank_soal`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: EDIT_SOAL,
        isSuccess: false,
        isError: true,
      });
    });
};

export const changeStatus = (id) => (dispatch) => {
  axios
    .put(`/api/bank_soal/change_status/${id}`)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `status berhasil di ganti`, "success");
      dispatch({
        type: EDIT_SOAL,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data bank_soal`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: EDIT_SOAL,
        isSuccess: false,
        isError: true,
      });
    });
};
export const deleteSoalSelected = (ids) => (dispatch) => {
  axios
    .delete(`/api/bank_soal/delete_selected/${ids}`)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data yang dipilih berhasil dihapus`, "success");
      dispatch({
        type: DELETE_SOAL,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data bank_soal`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: DELETE_SOAL,
        isSuccess: false,
        isError: true,
      });
    });
};
export const deleteSoal = (id, form) => (dispatch) => {
  axios
    .delete(`/api/bank_soal/${id}`, form)
    .then((res) => {
      console.log("res.data", res.data);
      swal("Good job!", `data berhasil dihapus`, "success");
      dispatch({
        type: DELETE_SOAL,
        isSuccess: true,
        isError: false,
      });
    })
    .catch((err) => {
      console.log(`err add data bank_soal`, err);
      swal("Uppss", `Error, ${err?.response?.data}`, "error");
      dispatch({
        type: DELETE_SOAL,
        isSuccess: false,
        isError: true,
      });
    });
};
export const resetSoal = () => (dispatch) => {
  dispatch({
    type: RESET_SOAL,
  });
};
