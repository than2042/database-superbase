import { useState, useEffect } from "react";
import Form from "../../components/form/Form";
import "./User.css";

const User = () => {
  const APIURL = "https://database-server-cjrd.onrender.com/users";
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
    console.log("Current State:", formData);
  }, [formData]);

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

  // reset form value
  const resetForm = () => {
    document.getElementById("userForm").reset();
  };

  const handleSubmit = async () => {
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

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
      resetForm();
    } else {
      console.log("failed to create user");
    }
  };

  return (
    <div className="container">
      <img src="./images/water.webp" alt="water" id="waterImg" />
      <div className="userForm">
        <h2 className="userPost">Join Blog Post!!!</h2>
        <Form
          handleSubmit={handleSubmit}
          fields={fields}
          btnText="Submit"
          handleChange={handleChange}
          className="formlabel"
          defaultValue={{
            name: "",
            email: "",
            password: "",
          }} // default value to reset form input after submit
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
