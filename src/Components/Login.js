import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validateForm = () => {
    return username.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      let response = await axios.post("http://localhost:3000/api/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        console.log("Success");
        // auth.login(response.data.username, response.data.token);
        setError("");
      }
    } catch (err) {
      setError("Wrong username or password.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-middle vh-100"
      style={{ marginTop: "10%" }}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            autoFocus
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password" className="my-2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button
          block="true"
          size="sm"
          type="submit"
          className="my-2"
          disabled={!validateForm()}
        >
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
