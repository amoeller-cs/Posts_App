import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./styles/Options.css";

function Options(props) {
  return (
    <div className="optionsPage" role="main">
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
        <Link to="/posts">
          <button className="navButton" type="button">
            Posts
          </button>
        </Link>
        <Link to="/likes">
          <button className="navButton" type="button">
            Likes
          </button>
        </Link>
        <Link to="/options">
          <button className="navButton" type="button">
            Options
          </button>
        </Link>
        <form action="/signout" method="post">
          <input
            className="navButton"
            type="submit"
            name="signout"
            value="Sign Out"
          />
        </form>
      </nav>
      <br />
      <br />
      <h1 className="text-center"> Options </h1>
      <div className="container-fluid d-flex justify-content-center">
        <div className="deleteCard" role="form">
          <h2 className="card-header">Delete Account</h2>
          <div className="card-body">
            <p>
              If you would like to delete your <br />
              account click the button below <br />
              (cannot be undone).
            </p>
            <form id="delete" action="/delete" method="post"></form>
            <form>
              <div className="form-group">
                <input
                  type="hidden"
                  id="user"
                  name="username"
                  form="delete"
                  value={`${props.user}`}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="navButton"
                  id="deleteAccount"
                  value="Delete Account"
                  form="delete"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Options;
