import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function LoginDialog({ open, onClose, onLoginSuccess })
{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const backendUrl = 'http://localhost:3001/api';

    async function handleLoginSubmit(event)
    {
        event.preventDefault();
        setError('');

        try
        {
            // LOGIN
            // TYPE: POST http://localhost:3001/api/login
            const response = await fetch(`${backendUrl}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                });

            if (response.ok)
            {
                const data = await response.json();
                onLoginSuccess({
                    username: data.username,
                    superuser: data.superuser,
                    password: password
                });
                onClose();
                setUsername('');
                setPassword('');
            }
            else
            {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        }
        catch (fetchError)
        {
            console.error('Login network error:', fetchError);
            setError('Failed to connect to the server. Please check your network.');
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleLoginSubmit,
                    style: { minWidth: "300px" }
                }
            }}
        >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    label="Username"
                    type="text"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">Login</Button>
            </DialogActions>
        </Dialog>
    );
}

export default LoginDialog;