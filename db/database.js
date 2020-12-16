const { MongoClient } = require("mongodb");

function MyDB() {
  const myDB = {};

  const uri = process.env.MONGO_URL || "mongodb://localhost:27017";

  myDB.getUserDB = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const users = db.collection("users");
    return users;
  };

  myDB.deleteLikes = async (user) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const likes = db.collection("likes");
    likes.deleteOne({ _id: user });
    return;
  };

  myDB.getUsers = async () => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const users = db.collection("users");
    const query = {};
    return users
      .find(query)
      .toArray()
      .finally(() => client.close());
  };

  myDB.getPosts = async () => {
    console.log("getting posts");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const users = db.collection("posts");
    const query = {};
    return users
      .find(query)
      .toArray()
      .finally(() => client.close());
  };

  myDB.upvote = async (user, title, date) => {
    console.log(date);
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const posts = db.collection("posts");
    posts.update(
      { titletextonly: title, "result-date": date },
      { $inc: { score: 1 } }
    );
    return;
  };

  myDB.downvote = async (user, title, date) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const posts = db.collection("posts");
    await posts.update(
      { titletextonly: title, "result-date": date },
      { $inc: { score: -1 } }
    );
    return;
  };

  myDB.getLikes = async () => {
    console.log("getting likes");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const likes = db.collection("likes");
    const query = {};
    return likes
      .find(query)
      .toArray()
      .finally(() => client.close());
  };

  myDB.createLikes = async (user) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const likes = db.collection("likes");
    const result = await likes.find({ _id: user }).toArray();
    if (result.length == 0) {
      await likes.insertOne({
        _id: user,
        likedPosts: [],
      });
    }
    return;
  };

  myDB.addLike = async (user, post, date) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const favorites = db.collection("likes");
    await favorites.update(
      { _id: user },
      { $addToSet: { likedPosts: [post, date] } }
    );
    return;
  };

  myDB.removeLike = async (user, post, date) => {
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const likes = db.collection("likes");
    await likes.update({ _id: user }, { $pull: { likedPosts: [post, date] } });
    return;
  };

  myDB.getPostsByScore = async () => {
    console.log("getting posts by score");
    const client = new MongoClient(uri, { useUnifiedTopology: true });
    await client.connect();
    const db = client.db("postdb");
    const users = db.collection("posts");
    const query = {};
    return users
      .find(query)
      .sort({ score: -1 })
      .toArray()
      .finally(() => client.close());
  };

  return myDB;
}

module.exports = MyDB();
