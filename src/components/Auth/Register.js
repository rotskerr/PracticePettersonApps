import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Auth.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleName =(e) =>{
    setName(e.target.value);
  }


  const handleApi = () => {
    axios
      .post(
        "https://practicepetersonapps.herokuapp.com/api/register",
        {
          name:name,
          email: email,
          password: password,
        },
        {
          headers: {
            "Accept":  'application/json',
            "Content-Type" : 'application/json' 
          },
        }
      )
      .then((result) => {
        console.log(result);
        localStorage.setItem('token', result.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>   
      {/* name: <input value={name} onChange={handleName} type="text" />
      <br />
      email: <input value={email} onChange={handleEmail} type="text" />
      <br />
      password: <input value={password} onChange={handlePassword} type="text" />
      <br />
      <Button onClick={handleApi}>Login</Button> */}


      <form className="LoginBox">
        <Typography variant="h4" padding={3}>
          Signup
        </Typography>

        <TextField
          value={name}
          onChange={handleName}
          sx={{ input: { color: "#B8B7B7" } }}
          type={"text"}
          variant="outlined"
          placeholder="email"
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
          Signup
        </Button>
        <Button sx={{ marginTop: 3, color: "#B8B7B7" }}><Link to="/login">Login</Link></Button>
      </form>

    </div>
  );
};

export default Login;
