import React, { useContext } from "react";
import AuthContext from "../context/Auth";

export default function Loan() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <>
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <h2
            style={{ color: "red", fontSize: "50px" }}
            className="text-center"
          >
            This Page Is Under Development
          </h2>
          <button className="btn btn-danger" onClick={logoutUser}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
}
