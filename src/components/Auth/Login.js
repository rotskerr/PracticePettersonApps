import { Button } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

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
            "Accept":  'application/json',
            "Content-Type" : 'application/json' 
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
      email: <input value={email} onChange={handleEmail} type="text" />
      <br />
      password: <input value={password} onChange={handlePassword} type="text" />
      <br />
      <Button onClick={handleApi}>Login</Button>
    </div>
  );
};

export default Login;
