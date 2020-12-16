import React from "react";
import "./styles/Register.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Register() {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");

  return (
    <div className="signupPage" role="main">
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-dark"
        role="navigation"
      >
        <a className="navbar-brand" href="/">
          <img
            src="./images/whiteHouse.png"
            alt="House Icon"
            title="House Icon"
            width="50"
          />
          Posts App
        </a>
        <Link to="/login">
          <button className="navButton" type="button">
            Login
          </button>
        </Link>
        <Link to="/register">
          <button className="navButton" type="button">
            Register
          </button>
        </Link>
      </nav>
      <div className="container-fluid d-flex justify-content-center">
        <div className="cardUp" role="form">
          <h1 className="card-header">Sign Up</h1>
          <div className="card-body">
            <form action="/signup" method="POST">
              <div className="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className="form-control"
                  placeholder="username"
                />
              </div>
              <div className="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                />
              </div>
              <div className="form group">
                <label for="passwordVerify">Verify Password</label>
                <input
                  type="password"
                  id="passwordVerify"
                  name="passwordVerify"
                  className="form-control"
                  placeholder="password"
                />
              </div>
              <br />
              {error ? <div>{error}</div> : ""}
              <button type="submit" className="navButton">
                Sign Up
              </button>
            </form>
          </div>
          <div className="card-footer">
            Already signed up? <Link to="/login">Login</Link>
            <br />
          </div>
        </div>
      </div>
      ;
    </div>
  );
}

export default Register;
