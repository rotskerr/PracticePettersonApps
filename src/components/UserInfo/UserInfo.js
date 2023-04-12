import { Button, Box, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const [user, setUser] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.stringify(storedUser));
    }
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
        <Link to="/login" onClick={handleLogout}>
          Log Out
        </Link>
      </Button>
    </div>
  );
};

export default UserInfo;
