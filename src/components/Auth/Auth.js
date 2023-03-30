import { Button, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import "./Auth.css";
import { useState } from "react";

const Auth = () => {
  const [isSignup, setisSignup] = useState(false);

  return (
    <div>
      <form>
        <Box className="LoginBox">
          <Typography variant="h4" padding={3}>
            {isSignup ? "Signup" : "Login"}
          </Typography>
          <TextField
            sx={{ input: { color: "#B8B7B7" } }}
            type={"text"}
            variant="outlined"
            placeholder="name"
            margin="normal"
          />
          {isSignup && (
            <TextField
              sx={{ input: { color: "#B8B7B7" }}}
              type={"email"}
              variant="outlined"
              placeholder="email"
              margin="normal"
            />
          )}
          <TextField
            sx={{ input: { color: "#B8B7B7" } }}
            type={"password"}
            variant="outlined"
            placeholder="password"
            margin="normal"
          />
          <Button sx={{ marginTop: 3 }} variant="contained" color="success">
            {isSignup ? "Signup" : "Login"}
          </Button>
          <Button
            onClick={() => setisSignup(!isSignup)}
            sx={{ marginTop: 3, color: "#B8B7B7" }}
          >
            {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;