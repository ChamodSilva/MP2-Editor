import { useState } from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import "../css/Navigation.css";
import MenuIcon from "@mui/icons-material/Menu";
import
{
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Menu,
    Container,
    MenuItem
} from "@mui/material";

import AppTitle from './AppTitle';
import DesktopNavLinks from './DesktopNavLinks';
import UserAuthSection from './UserAuthSection';

const containerConfig = [
    { label: "Explore", link: "" },
    { label: "Edit", link: "/edit-page" },
    { label: "Contact Us", link: "/contact-page" },
];

function Navigation({ loggedInUser, onOpenLoginDialog, onLogout, onOpenUserCreateDialog })
{
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const navigate = useNavigate();

    function handleOpenNav(event)
    {
        setAnchorElNav(event.currentTarget);
    }

    function handleCloseNav()
    {
        setAnchorElNav(null);
    }

    function handleOpenUserMenu(event)
    {
        setAnchorElUser(event.currentTarget);
    }

    function handleCloseUserMenu()
    {
        setAnchorElUser(null);
    }

    function handleLogoutClick()
    {
        onLogout();
        handleCloseUserMenu();
        navigate('/');
    }

    return (
        <AppBar
            sx={{
                display: "flex",
                justifyContent: "center",
                width: "80vw",
                borderRadius: "30px",
                color: "Black",
                backgroundColor: "#669999"
            }}
            position="static"
        >
            <Container
                sx={{
                    display: "flex",
                    justifySelf: "center",
                    justifyContent: "space-between"
                }}
                maxWidth="xl"
            >
                <Toolbar disableGutters>
                    <AppTitle />

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
                            {containerConfig.map((page) => (
                                <MenuItem
                                    sx={{ userSelect: "none" }}
                                    key={page.label}
                                    onClick={handleCloseNav}
                                >
                                    <NavLink to={page.link}>
                                        {page.label}
                                    </NavLink>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <AppTitle isMobile={true} />

                    <DesktopNavLinks pages={containerConfig} />

                    <UserAuthSection
                        loggedInUser={loggedInUser}
                        onOpenLoginDialog={onOpenLoginDialog}
                        onLogoutClick={handleLogoutClick}
                        anchorElUser={anchorElUser}
                        handleOpenUserMenu={handleOpenUserMenu}
                        handleCloseUserMenu={handleCloseUserMenu}
                        onOpenUserCreateDialog={onOpenUserCreateDialog}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navigation;