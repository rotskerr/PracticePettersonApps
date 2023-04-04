import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const UserInfo = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      user info
     <Button><Link to="/login" onClick={handleLogout}>Log Out</Link></Button> 
    </div>
  );
};

export default UserInfo;
