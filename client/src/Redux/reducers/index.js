import { combineReducers } from "redux";
import authReducer from "../reducers/authReducer";
import profileReducer from "../reducers/profileReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  admin: adminReducer,
});
