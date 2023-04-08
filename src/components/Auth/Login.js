import { Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  "& .MuiInputLabel-root": {
    color: "#b8b7b7",
  },
  "& .MuiOutlinedInput-root": {
    "&.Mui-focused fieldset": {
      color: "#b8b7b7",
      borderColor: "#b8b7b7",
    },
  },
});
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        // зберігаємо токен користувача в localStorage
        localStorage.setItem("token", result.data.token);
        // переходимо на домашню сторінку
        navigate("/");
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
        <StyledTextField
          value={email}
          onChange={handleEmail}
          sx={{ input: { color: "#B8B7B7" } }}
          type={"text"}
          variant="outlined"
          placeholder="email"
          margin="normal"
        />
        <StyledTextField
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
        <Button sx={{ marginTop: 3, color: "#B8B7B7" }}>
          <Link to="/register">Signup</Link>
        </Button>
      </form>
    </div>
  );
};

export default Login;
