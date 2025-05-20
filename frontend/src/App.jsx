import { useState, useEffect } from 'react';
import './css/App.css';
import AppRoutes from './AppRoutes';
import { Container } from "@mui/material";
import Navigation from './components/Navigation.jsx';
import LoginDialog from './components/LoginDialog.jsx';
import UserCreateDialog from './components/UserCreateDialog.jsx';

function App()
{
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInPassword, setLoggedInPassword] = useState(null);

    const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
    const [isUserCreateDialogOpen, setIsUserCreateDialogOpen] = useState(false);

    function handleLoginSuccess(user)
    {
        setLoggedInUser({ username: user.username, superuser: user.superuser });
        setLoggedInPassword(user.password);
    }

    function handleLogout()
    {
        setLoggedInUser(null);
        setLoggedInPassword(null);
    }

    useEffect(() =>
    {
        const storedUsername = localStorage.getItem('loggedInUsername');
        const storedSuperuser = localStorage.getItem('isSuperuser');
        const storedPassword = localStorage.getItem('loggedInPassword');

        if (storedUsername && storedPassword)
        {
            setLoggedInUser({
                username: storedUsername,
                superuser: storedSuperuser === 'true'
            });
            setLoggedInPassword(storedPassword);
        }
    }, []);

    useEffect(() =>
    {
        if (loggedInUser && loggedInPassword)
        {
            localStorage.setItem('loggedInUsername', loggedInUser.username);
            localStorage.setItem('isSuperuser', loggedInUser.superuser);
            localStorage.setItem('loggedInPassword', loggedInPassword);
        }
        else
        {
            localStorage.removeItem('loggedInUsername');
            localStorage.removeItem('isSuperuser');
            localStorage.removeItem('loggedInPassword');
        }
    }, [loggedInUser, loggedInPassword]);


    function openLoginDialog()
    {
        setIsLoginDialogOpen(true);
    }

    function closeLoginDialog()
    {
        setIsLoginDialogOpen(false);
    }

    function openUserCreateDialog()
    {
        setIsUserCreateDialogOpen(true);
    }

    function closeUserCreateDialog()
    {
        setIsUserCreateDialogOpen(false);
    }

    function handleUserCreated()
    {
        console.log('New user successfully created!');
    }

    return (
        <>
            <Navigation
                loggedInUser={loggedInUser}
                onOpenLoginDialog={openLoginDialog}
                onLogout={handleLogout}
                onOpenUserCreateDialog={openUserCreateDialog}
            />

            <Container sx={{ display: "flex", height: "80vh", width: "80vw" }}>
                <AppRoutes
                    loggedInUser={loggedInUser}
                    userPassword={loggedInPassword}
                />
            </Container>

            <LoginDialog
                open={isLoginDialogOpen}
                onClose={closeLoginDialog}
                onLoginSuccess={handleLoginSuccess}
            />

            {loggedInUser && loggedInUser.superuser && (
                <UserCreateDialog
                    open={isUserCreateDialogOpen}
                    onClose={closeUserCreateDialog}
                    onUserCreated={handleUserCreated}
                />
            )}
        </>
    );
}

export default App;