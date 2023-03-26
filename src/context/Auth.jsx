import { createContext, useState } from "react";
import axios from "axios";
import { DataProvider } from "./Data";

const AuthContext = createContext();
export default AuthContext;

export function AuthProvider({ children }) {
  
  const [loginStatus, setloginStatus] = useState(() =>
    localStorage.getItem("token") ? true : false
  );

  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null
  );
  
  const baseURL = "http://192.168.0.112:8000"

  const loginUser = async (e) => {
    e.preventDefault();
    console.log("work")
    try {
      let response = await axios.post(`${baseURL}/api/token/`, {
        username: `${e.target.username.value}`,
        password: `${e.target.password.value}`,
      });
      let data = await response.data;
      if (response.status === 200) {
        setAuthToken(data);
        setloginStatus(true);
        localStorage.setItem("token", JSON.stringify(data));
        e.target.username.value = "";
        e.target.password.value = "";
      }
    } catch (error) {
      if (error.response.status === 401) {
        console.log("wrong username or password")
      } else {
        console.log("something went wrong")
      }
      e.target.username.value = "";
      e.target.password.value = "";
    }
  };

  const logoutUser = () => {
    setloginStatus(false);
    setAuthToken(null);
    localStorage.removeItem("token");
  };

  let contextData = {
    loginStatus: loginStatus,
    authToken: authToken,
    baseURL:baseURL,
    setAuthToken: setAuthToken,
    loginUser: loginUser,
    logoutUser: logoutUser,
    setloginStatus: setloginStatus,
  };

  return (
    <AuthContext.Provider value={contextData}>
      <DataProvider>{children}</DataProvider>
    </AuthContext.Provider>
  );
}
