import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./styles/Posts.css";
import Upvote from "./styles/images/house.png";
import Downvote from "./styles/images/downHouse.png";
import "bootstrap/dist/css/bootstrap.min.css";

function Posts(props) {
  const [apts, setApts] = useState([]);
  const [search, setSearch] = useState("");
  const [search2, setSearch2] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [firstPost, setFirst] = useState(0);
  const [lastPost, setLast] = useState(99);
  const [pageCount, setPageCount] = useState(31);

  const urlParams = new URLSearchParams(window.location.search);
  const username = urlParams.get("username");
  if (username !== null && username !== undefined) {
    localStorage.setItem("username", username);
  }

  useEffect(() => {
    const getApts = async () => {
      console.log("getting apts");
      try {
        const _apts = await fetch("/score").then((res) => res.json());
        setApts(_apts);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getApts();
  }, []);

  const sortByScore = () => {
    const res = [...apts].sort((a, b) => b.score - a.score);
    setApts(res);
  };

  const sortByScoreReverse = () => {
    const res = [...apts].sort((a, b) => a.score - b.score);
    setApts(res);
  };

  const sortByPrice = () => {
    const res = [...apts].sort(
      (a, b) =>
        a["result-price"].substring(1).replace(",", "") -
        b["result-price"].substring(1).replace(",", "")
    );
    setApts(res);
  };

  const sortByPriceReverse = () => {
    const res = [...apts].sort(
      (a, b) =>
        b["result-price"].substring(1).replace(",", "") -
        a["result-price"].substring(1).replace(",", "")
    );
    setApts(res);
  };

  const incPage = () => {
    if (currentPage === pageCount) return;
    const newP = currentPage + 1;
    setCurrentPage(newP);
    setFirst(firstPost + 99);
    setLast(lastPost + 99);
  };

  const decPage = () => {
    if (currentPage === 1) return;
    setFirst(firstPost - 99);
    setLast(lastPost - 99);
    setCurrentPage(currentPage - 1);
  };

  const renderPosts = () => {
    if (props.posts === 0) return null;
    if (apts === 0) return null;
    const len = apts.filter(
      (p) =>
        p["result-hood"] &&
        p["result-hood"].toLowerCase().includes(search.toLowerCase()) &&
        p.titletextonly &&
        p.titletextonly.toLowerCase().includes(search2.toLowerCase())
    ).length;
    if (Math.ceil(len / 99) !== pageCount) {
      setPageCount(Math.ceil(len / 99));
    }
    return apts
      .filter(
        (p) =>
          p["result-hood"] &&
          p["result-hood"].toLowerCase().includes(search.toLowerCase()) &&
          p.titletextonly &&
          p.titletextonly.toLowerCase().includes(search2.toLowerCase())
      )
      .slice(firstPost, lastPost)
      .map((p) => (
        <li className="borderList">
          <div className="formClass">
            <div>
              <form action="/upvote" method="post">
                <input
                  type="hidden"
                  name="user"
                  value={`${props.user}`}
                ></input>
                <input
                  type="hidden"
                  name="title"
                  value={`${p.titletextonly}`}
                ></input>
                <input
                  type="hidden"
                  name="date"
                  value={`${p["result-date"]}`}
                ></input>
                <input
                  type="image"
                  className="upvote"
                  alt="Upvote"
                  src={Upvote}
                ></input>
              </form>
              <div className="scoreContainer">{p["score"]}</div>
              <form action="/downvote" method="post">
                <input
                  type="hidden"
                  name="user"
                  value={`${props.user}`}
                ></input>
                <input
                  type="hidden"
                  name="title"
                  value={`${p.titletextonly}`}
                ></input>
                <input
                  type="hidden"
                  name="date"
                  value={`${p["result-date"]}`}
                ></input>
                <input
                  type="image"
                  className="downvote"
                  alt="Downvote"
                  src={Downvote}
                ></input>
              </form>
            </div>
            <div>
              <h4>{p["result-title"]}</h4>
              <div>
                Price: {p["price"]} <br />
                Housing: {p["housing"]} <br />
                Location: {p["result-hood"]} <br />
                Date posted: {p["result-date"]}
              </div>
            </div>
          </div>
        </li>
      ));
  };

  return (
    <div className="postPage" role="main">
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
      <div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-center"> Posts </h1>
        <div className="searchContainer">
          <label className="searchArea" htmlFor="search">
            Search for a location for your apt:{" "}
            <input
              type="text"
              value={search}
              onChange={(evt) => setSearch(evt.target.value)}
            />
          </label>
          <label className="searchArea" htmlFor="search">
            Search the posting titles:{" "}
            <input
              type="text"
              value={search2}
              onChange={(evt) => setSearch2(evt.target.value)}
            />
          </label>
        </div>
        <div className="sortContainer">
          <button className="navButton" onClick={() => sortByScore()}>
            Sort By Score (Descending)
          </button>
          <button className="navButton" onClick={() => sortByScoreReverse()}>
            Sort By Score (Ascending)
          </button>
          <button className="navButton" onClick={() => sortByPrice()}>
            Sort By Price (Ascending)
          </button>
          <button className="navButton" onClick={() => sortByPriceReverse()}>
            Sort By Price (Descending)
          </button>
        </div>
        <br /> <br />
        <ol className="postPosts">{renderPosts()}</ol>
      </div>
      <div className="pagination">
        <button className="navButton" onClick={() => decPage()}>
          Prev
        </button>
        <button className="navButton" onClick={() => incPage()}>
          Next
        </button>
      </div>
      <br /> <br />
    </div>
  );
}

export default Posts;
