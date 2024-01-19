import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import "./User.css";

const User = () => {
  const APIURL = "http://localhost:8080/users";
  const [getUser, setGetUser] = useState([]);
  const [formData, setFromData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const fields = [
    { id: 1, name: "name", label: "Name: " },
    { id: 2, name: "email", label: "Email: " },
    { id: 3, name: "password", label: "Password: " },
  ];

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGetUser = async () => {
    const response = await fetch(`${APIURL}`);
    const data = await response.json();
    setGetUser(data);
  };

  const handleSubmit = async () => {
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };
    console.log(newUser, "data");
    const response = await fetch(`${APIURL}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    if (response.ok) {
      setGetUser([...getUser, newUser]);
    } else {
      console.log("failed to create user");
    }
  };

  return (
    <div className="container">
      <img src="./images/water.webp" alt="water" />
      <div className="userForm">
        <h2 className="userPost">Join Blog Post!!!</h2>
        <Form
          handleSubmit={handleSubmit}
          fields={fields}
          btnText="Submit"
          handleChange={handleChange}
          className="formlabel"
        />
      </div>
      <div className="section">
        <img
          className="creationImg"
          src="./images/creation.jpg"
          alt="creation"
        />
        <div className="creation">
          <div className="createText">
            <h3>Creation starts here!!!</h3>
            <p>Your creativity knows no boundaries</p>
          </div>
          <div className="empty"></div>
        </div>
      </div>
    </div>
  );
};

export default User;
