import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import "./AddPost.css";

const AddPost = () => {
  let APIURL = "http://localhost:8080/posts";

  const [getPost, setGetPost] = useState([]);
  const [formData, setFromData] = useState({
    title: "",
    content: "",
  });

  const fields = [
    { id: 1, name: "title", label: "Title: " },
    { id: 2, name: "content", label: "Content: " },
  ];

  useEffect(() => {
    handleGetPost();
  }, []);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetPost = async () => {
    const response = await fetch(`${APIURL}`);
    const data = await response.json();
    setGetPost(data);
  };

  const handleSubmit = async () => {
    const newPost = {
      title: formData.title,
      content: formData.content,
    };
    console.log(newPost, "data");
    const response = await fetch(`${APIURL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      setGetPost([...getPost, newPost]);
    } else {
      console.log("failed to create user");
    }
  };

  return (
    <div className="container addPost">
      <div className="addContainer">
        <h2 className="addText">Post your new blog here!!!</h2>
        <Form
          handleSubmit={handleSubmit}
          fields={fields}
          btnText="Add Post"
          handleChange={handleChange}
          className="formlabel"
        />
      </div>
      <img className="addImage" src="./images/modern.webp" alt="modern" />
    </div>
  );
};

export default AddPost;
