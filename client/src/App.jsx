import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";

import { Provider } from "react-redux";
import store from "./Redux/store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { logoutUser, setCurrentUser } from "./Redux/actions/authActions";

//check for token
if (localStorage.jwtToken) {
  // set auth token header auth
  setAuthToken(localStorage.jwtToken);
  //decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  //check for expired token
  const currenTime = Date.now() / 1000;
  if (decoded.exp < currenTime) {
    // log out user
    store.dispatch(logoutUser());

    //redirect to login
    window.location.href = "/";
  }
}

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
        <Route path="*" element={<Navigate to="/auth/sign-in" replace />} />
      </Routes>
    </Provider>
  );
}

export default App;
