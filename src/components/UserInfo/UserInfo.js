import { Button, Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserInfo = ({ name, email, avatarUrl }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <Box display="flex" alignItems="center">
        <Avatar src={avatarUrl} />
        <Box marginLeft={2}>
          <Typography variant="h5">User Name</Typography>
          <Typography variant="subtitle1">user_email@gmail.com</Typography>
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
