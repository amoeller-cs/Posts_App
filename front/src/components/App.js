import React, { useState, useEffect } from "react";
import "./styles/App.css";
import Posts from "./Posts.js";
import Likes from "./Likes.js";
import Register from "./Register.js";
import Login from "./Login.js";
import Home from "./Home.js";
import Options from "./Options.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  console.log(user);

  useEffect(() => {
    const getPosts = async () => {
      console.log("getting posts");
      try {
        const _posts = await fetch("/posts").then((res) => res.json());
        setPosts(_posts);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getPosts();
  }, []);

  useEffect(() => {
    const getLikes = async () => {
      console.log("getting likes");
      try {
        const _likes = await fetch("/likes").then((res) => res.json());
        setLikes(_likes);
      } catch (err) {
        console.log("error ", err);
      }
    };
    getLikes();
  }, []);

  return (
    <div>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route
              path="/posts"
              render={(props) => <Posts {...props} user={user} />}
            />
            <Route
              path="/likes"
              render={(props) => (
                <Likes {...props} posts={posts} likes={likes} user={user} />
              )}
            />
            <Route
              path="/options"
              render={(props) => <Options {...props} user={user} />}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
