import React from "react";
import logo from "./img/logo.svg";
import "./Nav.css";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import UserInfo from "../UserInfo/UserInfo";

const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <div>
      <nav>
        <Link to="/">
          <img src={logo}  alt="logo" />
        </Link>
        <ul className="nav-links">
          <Link to="/dashboard">
            <li>Dashboard</li>
          </Link>
          <Link to="/agileboard">
            <li>Agileboard</li>
          </Link>
          <li>
            <div>
              <button className="UserInfoBtn" aria-describedby={id} type="button" onClick={handleClick}>
                User Info
              </button>
              <Popper id={id} open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>
                      <UserInfo />
                    </Box>
                  </Fade>
                )}
              </Popper>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
