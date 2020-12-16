import React from "react";
import { Link } from "react-router-dom";
import "./styles/Home.css";

function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");
  const username = urlParams.get("username");
  localStorage.setItem("username", username);

  return (
    <div className="welcomepage" role="main">
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
        <div className="homebuttons">
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
        </div>
      </nav>
      <div className="messageContainer">
        <div className="message"> {msg ? `${msg}` : ""}</div>
      </div>
      <br />
      <div className="instructionContainer">
        <div className="instructions" tabindex="0">
          <h1>Welcome to Posts App! </h1>
          <p>
            Create an account by clicking the sign up button to begin your
            apartment search. <br /> <br />
            Site instructions: <br /> <br />
            Search through the listings by clicking the Posts button. You can
            filter the posts according to what your preferences are by using the
            GUI.
            <br />
            <br />
            If you see a post you like, you can click the "up house" button to
            increase its visibility on the site and save it to your liked posts
            page.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
