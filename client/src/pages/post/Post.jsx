import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import "./Post.css";

const Post = () => {
  const APIURL = "http://localhost:8080/posts";
  const [getPost, setGetPost] = useState([]);
  const [search, setSearch] = useState("");
  const [deletePost, setDeletePost] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    handleGetPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, deletePost]);

  useEffect(() => {
    // load likes form localstorage when the component mounts
    const likeLocalStorage = JSON.parse(localStorage.getItem("likes")) || {};
    setLikes(likeLocalStorage);
  }, []);

  const handleGetPost = async () => {
    const response = await fetch(`${APIURL}`);
    const data = await response.json();
    setGetPost(data);
  };

  const handleSearch = async (e) => {
    let searchItem = e.target.value.toLowerCase();
    setSearch(searchItem);

    try {
      const response = await fetch(`${APIURL}?search=${searchItem}`);
      const data = await response.json();
      const filteredPosts = data.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );
      console.log(filteredPosts, "fi");
      setGetPost(filteredPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    const response = await fetch(`${APIURL}/${postId}`, {
      method: "DELETE",
    });
    console.log(response, "res");

    if (response.ok) {
      console.log("Post deleted successfully");
      setDeletePost(postId);
    } else {
      console.error("Error deleting", response.status);
    }
  };

  const handdleCountLikes = (postId) => {
    // update likes on specific post
    setLikes((prevLikes) => {
      const newLikes = { ...prevLikes, [postId]: (prevLikes[postId] || 0) + 1 };
      // save the updated likes to localstorage
      localStorage.setItem("likes", JSON.stringify(newLikes));

      return newLikes;
    });
  };

  return (
    <div className="container post">
      <div className="postContainer">
        <h1>Hello Post</h1>
        <TextField
          placeholder="Search"
          id="filled-hidden-label-normal"
          variant="filled"
          onChange={handleSearch}
          value={search}
        />
      </div>
      <div className="itemContainer">
        <div className="postItem">
          {getPost.map((post) => {
            return (
              <div className="card" key={post.id}>
                <h3 className="title" key={post.title}>
                  {post.title}
                </h3>
                <p className="content" key={post.content}>
                  {post.content}
                </p>
                <p className="time" key={post.createdat}>
                  {post.createdat}
                </p>
                <div>
                  <p onClick={() => handdleCountLikes(post.id)}>
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Likes: {likes[post.id] || 0}
                  </p>

                  {post.image && <img src={post.image} alt={post.title} />}
                  <Button
                    id="deleteBtn"
                    onClick={() => handleDelete(post.id)}
                    variant="outlined"
                    color="error"
                  >
                    Delete Post
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
