import { Button, TextField, Typography } from "@mui/material";
import React from "react";
import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleApi = () => {
    console.log({ email, password });
    axios
      .post(
        "https://practicepetersonapps.herokuapp.com/api/login",
        {
          email: email,
          password: password,
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
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <form className="LoginBox">
        <Typography variant="h4" padding={3}>
          Login
        </Typography>
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
          Login
        </Button>
        <Button sx={{ marginTop: 3, color: "#B8B7B7" }}><Link to="/register">Signup</Link></Button>
      </form>
    </div>
  );
};

export default Login;