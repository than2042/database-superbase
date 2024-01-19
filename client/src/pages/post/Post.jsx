import { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import "./Post.css";

const Post = () => {
  const APIURL = "http://localhost:8080/posts";
  const [getPost, setGetPost] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleGetPost();
  }, []);

  const handleGetPost = async () => {
    const response = await fetch(`${APIURL}?search=${search}`);
    const data = await response.json();
    setGetPost(data);
  };

  const handleSearch = () => {
    const filteredPosts = getPost.filter((post) => {
      post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.content.toLowerCase().includes(search.toLowerCase());
    });
    console.log(filteredPosts, "se");
    setSearch(filteredPosts);
  };

  return (
    <div className="container post">
      <div className="postContainer">
        <h1>Hello Post</h1>
        <TextField
          placeholder="Search"
          id="filled-hidden-label-normal"
          variant="filled"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onClick={handleSearch}
        />
      </div>
      <div className="postItem">
        {getPost.map((post) => {
          return (
            <div className="card" key={post.id}>
              <h3 key={post.title}>{post.title}</h3>
              <p key={post.content}>{post.content}</p>
              <p key={post.createdat}>{post.createdat}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Post;
