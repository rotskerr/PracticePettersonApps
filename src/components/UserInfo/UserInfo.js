import { Button, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser({});
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("https://practicepetersonapps.herokuapp.com/api/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box marginLeft={2}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
        </Box>
      </Box>
      <Button>
      <Link to="/login">
          Login
        </Link>
      </Button>
      <Button>

        <Link to="/login" onClick={handleLogout}>
          Log Out
        </Link>
      </Button>
    </div>
  );
};

export default UserInfo;
