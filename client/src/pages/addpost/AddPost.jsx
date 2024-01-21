import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import "./AddPost.css";

const AddPost = () => {
  let APIURL = "https://database-server-cjrd.onrender.com/posts";

  const [getPost, setGetPost] = useState([]);
  const [formData, setFromData] = useState({
    title: "",
    content: "",
    // image: "",
  });

  const fields = [
    { id: 1, name: "title", label: "Title: " },
    { id: 2, name: "content", label: "Content: " },
    // { id: 2, name: "image", label: "Image: ", type: "file" },
  ];

  useEffect(() => {
    handleGetPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // reset form input
  const resetForm = () => {
    document.getElementById("userForm").reset();
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
      image: formData.image,
    };

    const response = await fetch(`${APIURL}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    if (response.ok) {
      setGetPost([...getPost, newPost]);
      resetForm();
    } else {
      console.log("failed to create user");
    }
  };

  return (
    <div className="container addPost">
      <div className="addContainer">
        <h3 className="addText">Post your new blog here!!!</h3>
        <Form
          handleSubmit={handleSubmit}
          fields={fields}
          btnText="Add Post"
          handleChange={handleChange}
          className="formlabel"
          defaultValue={{
            name: "",
            content: "",
            image: "",
          }} // default value to reset form input after submit
        />
      </div>
      <img className="addImage" src="./images/modern.webp" alt="modern" />
    </div>
  );
};

export default AddPost;
