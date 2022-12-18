import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import profileReducer from "../reducers/profileReducer";
import adminReducer from "./adminReducer";
import kategoriReducer from "./kategoriReducer";
import kelasReducer from "./kelasReducer";
import pelajaranReducer from "./pelajaranReducer";
import soalReducer from "./soalReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  admin: adminReducer,
  kelas: kelasReducer,
  pelajaran: pelajaranReducer,
  kategori: kategoriReducer,
  soal: soalReducer,
});
