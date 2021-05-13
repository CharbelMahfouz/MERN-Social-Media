import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";

import "./Navbar.css";
import { useDispatch } from "react-redux";
import { LOGOUT } from "../../../actions/constants/actionTypes";
import { Avatar } from "@material-ui/core";

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
    history.push("/login");

    setUser(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header>
      <div className="navbar__container">
        <div className="navbar__left">
          <Link to="/">iSocialize</Link>
        </div>

        <div className="navbar__right">
          <div className="user">
            <p className="user__name">{user?.name}</p>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar
                alt={user.name}
                src={user.profileImg}
                className="user__info-icon"
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  handleClose();
                  history.push(`/user/${user._id}`);
                }}
              >
                Profile
              </MenuItem>

              <MenuItem
                onClick={() => {
                  handleLogout();
                  handleClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
