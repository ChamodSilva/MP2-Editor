import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { NavLink } from "react-router-dom";
import "../css/Navigation.css";

const containerConfig =
[
    {label: "Explore", link: ""},
    {label: "Edit", link: "/edit-page"},
    {label: "Contact Us", link: "/contact-page"},
]
function Navigation()
{
    const currentUser = "User";
    const [anchorElNav, setAnchorElNav] = useState(null);

    function handleOpenNav(event)
    {
        setAnchorElNav(event.currentTarget);
    };

    function handleCloseNav()
    {
        setAnchorElNav(null);
    };

    return (
    <AppBar sx={{ display: "flex", justifyContent:"center", width: "80vw", borderRadius: "30px", color: "Black", backgroundColor: "#669999"}} position="static">
        <Container sx={{display: "flex", justifySelf: "center", justifyContent: "space-between"}} maxWidth="xl">
            <Toolbar disableGutters>
                <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", justifyItems:"start", flexGrow: 0 , height: "45px", width: "300px" }}>
                <Typography
                    variant="h6"
                    noWrap
                    sx={{
                        textAlign: "center",
                        textJustify: "center",
                        alignItems: "center",
                        justifyItems:"center",
                        height: "45px",
                        width: "300px",
                        mr: 2,
                        userSelect: "none",
                        display: { xs: "none", md: "flex" },
                        fontFamily: "Lucida Sans",
                        fontWeight: 800,
                        letterSpacing: ".3rem",
                        color: "inherit",
                        textDecoration: "none",
                    }}
                >
                MP2-Editor
                </Typography>
                </Box>

                <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                    <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNav}
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
                    onClose={handleCloseNav}
                    sx={{ display: { xs: "block", md: "none" } }}
                    >
                    {containerConfig.map((page) =>
                    (
                        <MenuItem sx={{ userSelect: "none"}} key={page.label} onClick={handleCloseNav}>
                        <NavLink to={page.link}>
                            {page.label}
                        </NavLink>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    sx={{
                    mr: 2,
                    userSelect: "none",
                    display: { xs: "flex", md: "none" },
                    flexGrow: 1,
                    fontFamily: "Lucida Sans",
                    fontWeight: 800,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    }}
                >
                    MP2-Editor
                </Typography>
                <Box sx={{ alignItems: "center", justifyItems:"center", height: "45px", width: "300px",justifyContent: "center", userSelect: "none", display: { xs: "none", md: "flex" } }}>
                    {containerConfig.map((page) =>
                    (
                        <Box sx={{ height: "25px", width: "90px", margin: "5px",borderRadius: "20px", border: "black 2px solid"}}>
                            <NavLink key={page.label} to={page.link}>
                            {page.label}
                            </NavLink>
                        </Box>
                    ))}
                </Box>
                <Box sx={{ alignItems: "center", justifyItems:"end", flexGrow: 0 , height: "45px", width: "300px" }}>
                    <Tooltip title={currentUser}>
                    <Avatar sx={{border: "black 2px solid"}} alt="User" src="https://avatar.iran.liara.run/public" />
                    </Tooltip>
                </Box>
            </Toolbar>
        </Container>
    </AppBar>
    );
};

export default Navigation;
