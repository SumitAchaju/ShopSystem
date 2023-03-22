import React, { useContext } from "react"
import AuthContext from "../context/Auth"
import { Navigate } from "react-router-dom";

export default function Login () {
    const {loginUser,loginStatus} = useContext(AuthContext)

    if (loginStatus) {
        return <Navigate to="/" />;
      }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={loginUser}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter email"
              name="username"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              name="password"
            />
          </div>
          <div className="d-grid gap-2 mt-3 mb-4">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}