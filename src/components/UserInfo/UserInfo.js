import { Button, Avatar, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const UserInfo = ({ id }) => {
  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      setUser(storedUser);
    } else {
      axios
        .get(`https://practicepetersonapps.herokuapp.com/api/user/show/id`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data));
          setUser(response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Box marginLeft={2}>
          <Typography variant="h5">{user.name}</Typography>
          <Typography variant="subtitle1">{user.email}</Typography>
        </Box>
      </Box>
      <Button>
        <Link to="/login" onClick={handleLogout}>
          Log Out
        </Link>
      </Button>
    </div>
  );
};

export default UserInfo;
