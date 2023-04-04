import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleApi = () => {
    console.log({ email, password, name });
    axios
      .post(
        "https://practicepetersonapps.herokuapp.com/api/register",
        {
          email: email,
          password: password,
          name: name
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((result) => {
        console.log(result);
        alert("Registration successful! Please login to continue.");
        <Link to="/login">Login</Link>
      })
      .catch((error) => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      });
  };
  
  return (
    <div>
      <form className="LoginBox">
        <Typography variant="h4" padding={3}>
          Register
        </Typography>
        <TextField
          value={name}
          onChange={handleName}
          sx={{ input: { color: "#B8B7B7" } }}
          type={"text"}
          variant="outlined"
          placeholder="name"
          margin="normal"
        />
        <TextField
          value={email}
          onChange={handleEmail}
          sx={{ input: { color: "#B8B7B7" } }}
          type={"text"}
          variant="outlined"
          placeholder="email"
          margin="normal"
        />
        <TextField
          value={password}
          onChange={handlePassword}
          sx={{ input: { color: "#B8B7B7" } }}
          type={"password"}
          variant="outlined"
          placeholder="password"
          margin="normal"
        />
        <Button
          onClick={handleApi}
          sx={{ marginTop: 3 }}
          variant="contained"
          color="success"
        >
          Register
        </Button>
        <Button sx={{ marginTop: 3, color: "#B8B7B7" }}><Link to="/login">Login</Link></Button>
      </form>
    </div>
  );
};

export default Register;
