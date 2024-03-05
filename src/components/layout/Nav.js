"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink, useLocation } from "react-router-dom";
import Logout from "@/services/auth/logout";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/common/redux-toolkit/features/auth/authSlice";

const pages = ["User", "Role", "Group", "Project"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Nav() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleClick = (url) => {
    localStorage.setItem("prePath", url);
  };

  const handleCloseUserMenu = async (index) => {
    if (index === "Logout") {
      await handleLogout();
    }
    setAnchorElUser(null);
  };

  const location = useLocation();
  const handleLogout = async () => {
    const res = await Logout();
    if (res.code === 0) {
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.setItem("isAuth", false);
      localStorage.setItem("prePath", location.pathname);
    }
  };
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="h-full">
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <NavLink
            to="/"
            onClick={() => handleClick("/")}
            className="mr-2 font-bold tracking-wider text-xl"
            style={{ fontFamily: "monospace" }}
          >
            Home
          </NavLink>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="h-full"
          >
            {pages.map((page) => (
              <NavLink
                key={page}
                to={`/${page.toLowerCase()}`}
                onClick={() => handleClick(`/${page.toLowerCase()}`)}
                className={({ isActive }) =>
                  isActive ? "h-full border-b-4 border-white mx-2" : "mx-2"
                }
              >
                {page}
              </NavLink>
            ))}
          </Box>
          {auth.isAuth ? (
            <>
              <div className="text-xl m-2">Wellcome {auth.username}</div>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="https://www.shutterstock.com/image-vector/user-profile-icon-trendy-flat-260nw-1923506948.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting}
                      onClick={() => handleCloseUserMenu(setting)}
                    >
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <NavLink
                to={`/login`}
                onClick={handleCloseNavMenu}
                className="my-2 text-white block"
              >
                Login |
              </NavLink>
              <NavLink
                to={`/register`}
                onClick={handleCloseNavMenu}
                className="my-2 text-white block"
              >
                | register
              </NavLink>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Nav;
