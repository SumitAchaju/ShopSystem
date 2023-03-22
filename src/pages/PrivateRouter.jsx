import { Outlet,Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/Auth";

const PrivateRoutes = () => {
  let { loginStatus } = useContext(AuthContext);
  if(loginStatus){
    return (
        <Outlet />
    )
  }
  else{
    return(
      <Navigate to="/login" />
    )
  }
};

export default PrivateRoutes;
