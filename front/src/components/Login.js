import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/Login.css";

function Login() {
  const urlParams = new URLSearchParams(window.location.search);
  const error = urlParams.get("error");

  return (
    <div className="signinPage">
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
      <div
        className="container-fluid d-flex justify-content-center"
        role="main"
      >
        <div className="cardIn" role="form">
          <h1 className="card-header">Log In</h1>
          <div className="card-body">
            <form action="/signin" method="POST">
              <div className="form-group">
                <label for="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="username"
                  name="username"
                />
              </div>
              <div className="form group">
                <label for="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  placeholder="password"
                  name="password"
                />
              </div>
              <br />
              {error ? <div className="danger">{error}</div> : ""}
              <button type="submit" className="navButton">
                Login
              </button>
            </form>
          </div>
          <div className="card-footer">
            <div>
              Don't have an account? <Link to="/register">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
