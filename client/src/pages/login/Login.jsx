import { useState } from "react";
import Form from "../../components/form/Form";
import "./Login.css";

const Login = () => {
  const APIURL = "http://localhost:8080/login";
  const [getUser, setGetUser] = useState([]);
  const [formData, setFromData] = useState({
    email: "",
    password: "",
  });

  const fields = [
    { id: 2, name: "email", label: "Email: " },
    { id: 3, name: "password", label: "Password: " },
  ];

  const handleChange = (e) => {
    setFromData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${APIURL}`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setGetUser([...getUser, data]);
        console.log("User and posts:", data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div>
      <Form
        handleSubmit={handleSubmit}
        fields={fields}
        btnText="Submit"
        handleChange={handleChange}
        className="formlabel"
        defaultValue={{
          email: "",
          password: "",
        }} // default value to reset form input after submit
      />
    </div>
  );
};

export default Login;
