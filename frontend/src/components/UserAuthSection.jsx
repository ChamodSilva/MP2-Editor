import { Button, Box, Tooltip, IconButton, Avatar, Menu, MenuItem } from '@mui/material';

function UserAuthSection({
    loggedInUser,
    onOpenLoginDialog,
    onLogoutClick,
    onOpenUserCreateDialog,
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu
})
{
    return (
        <Box
            sx={{
                alignItems: "center",
                justifyItems: "end",
                flexGrow: 0,
                height: "45px",
                width: "300px"
            }}
        >
            {loggedInUser ? (
                <>
                    <Tooltip title={loggedInUser.username}>
                        <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                        >
                            <Avatar
                                sx={{ border: "black 2px solid" }}
                                alt={loggedInUser.username}
                                src="https://avatar.iran.liara.run/public"
                            />
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                        {loggedInUser.superuser && (
                            <MenuItem onClick={() => { handleCloseUserMenu(); onOpenUserCreateDialog(); }}>
                                Create User
                            </MenuItem>
                        )}
                        <MenuItem onClick={onLogoutClick}>Logout</MenuItem>
                    </Menu>
                </>
            ) : (
                <Button
                    variant="outlined"
                    onClick={onOpenLoginDialog}
                    sx={{ color: 'white', borderColor: 'white' }}
                >
                    Login
                </Button>
            )}
        </Box>
    );
}

export default UserAuthSection;