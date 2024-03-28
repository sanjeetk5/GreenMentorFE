import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUser, logout } from "../redux/authReducer/action";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";

const settings = ["Profile", "Logout"];

const Profile = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const user = useSelector((store) => store.authReducer.user);
  console.log(user);
console.log(user.data)
  const navigate = useNavigate();

//   const { data: [{ name }] } = user;
// console.log(name);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleNav = () => {
    navigate("/user-details")
    handleCloseNavMenu()

  }

  const dispatch = useDispatch();

  useEffect(() => {
    const shared = Cookies.get("savedtok");
    if (shared) {
      dispatch(getUser(shared));
    }
  }, [dispatch]);


  const handleLogout = () => {
    dispatch(logout())
    navigate("/signin")
    handleCloseUserMenu()
  }
  return (
    <Box sx={{ flexGrow: 0 }}>
      {user.data && user.data.length > 0 ? (
        <Tooltip title={`Hii There!! ${user.data[0].name} `}>
          <IconButton onClick={handleOpenUserMenu}>
            {user.data && user.data.length > 0 ? (
              <Avatar alt={user.data[0].name} src="">
                {user.data[0].name ? user.data[0].name.charAt(0).toUpperCase() : ""}
              </Avatar>
            ) : (
              <Avatar alt="" src=""></Avatar>
            )}
          </IconButton>
        </Tooltip>
      ) : (
        <>
          <Tooltip></Tooltip>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="" src="" />
          </IconButton>
        </>
      )}

      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}

      >

        <MenuItem style={{display:"grid"}} >

            <Typography textAlign={"center"} onClick={handleNav}  >
                Profile
            </Typography>
        

            <Typography textAlign={"center"} onClick={handleLogout} >
                Logout
            </Typography>
        
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Profile;
