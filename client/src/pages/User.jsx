import { useState, useEffect } from "react";
import Form from "../components/form/Form";

const User = () => {
  let APIURL = "http://localhost:8080/users";
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
    <div>
      <div>
        <h1>This is User</h1>
        <Form
          handleSubmit={handleSubmit}
          fields={fields}
          btnText="Submit"
          handleChange={handleChange}
        />
      </div>
    </div>
  );
};

export default User;
