import React from "react";
import "./styles/Likes.css";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Likes(props) {
  const renderLikes = () => {
    if (props.user === null) return null;
    const posts = props.posts;
    let count = Object.keys(posts).length;
    if (count === 0) {
      return null;
    }
    let likes = props.likes;
    if (likes.length === 0) return null;
    const userLikes = props.likes.filter((p) => p._id.startsWith(props.user));
    const likesArr = userLikes[0].likedPosts;
    var len = likesArr.length;
    if (len === 0) return null;
    var newArray = [];
    for (var i = 0; i < len; i++) {
      newArray.push(getPost(posts, likesArr[i][1], likesArr[i][0]));
    }
    return newArray.map((p) => (
      <li className="listElement">
        <div>
          <div className="container-fluid d-flex justify-content-center">
            <div className="likeCard">
              <h2 className="card-header">
                <h4>{p["result-title"]}</h4>
              </h2>
              <div className="card-body">
                Price: {p["price"]} <br />
                Housing: {p["housing"]} <br />
                Location: {p["result-hood"]} <br />
                Date posted: {p["result-date"]}
              </div>
              <div className="card-footer">
                <form action="/deleteLike" method="post">
                  <input
                    type="hidden"
                    name="user"
                    id={`user${p.titletextonly}`}
                    value={`${props.user}`}
                  />
                  <input
                    type="hidden"
                    name="date"
                    id={`remove${p["result-date"]}`}
                    value={`${p["result-date"]}`}
                  />
                  <input
                    type="hidden"
                    name="title"
                    id={`remove${p.titletextonly}`}
                    value={`${p.titletextonly}`}
                  />
                  <button className="navButton" type="submit">
                    Unlike
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div className="likesPage">
      <nav
        className="navbar navbar-inverse fixed-top navbar-dark bg-dark"
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
            type="submit"
            name="signout"
            value="Sign Out"
            className="navButton"
          />
        </form>
      </nav>
      <br />
      <div role="main">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-center"> Likes </h1>
        <br />
        <ol className="likedPosts">{renderLikes()}</ol>
      </div>
    </div>
  );
}

function getPost(post, date, title) {
  const res = post.filter((p) => p.titletextonly === title);
  const secondRes = res.filter((p) => p["result-date"] === date);
  return secondRes[0];
}

export default Likes;
