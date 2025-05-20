import { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';

function UserCreateDialog({ open, onClose, onUserCreated })
{
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isSuperuser, setIsSuperuser] = useState(false);
    const [error, setError] = useState('');
    const backendUrl = 'http://localhost:3001/api';

    async function handleCreateUserSubmit(event)
    {
        event.preventDefault();

        setError('');

        try
        {
            // CREATE USER
            // TYPE: POST http://localhost:3001/api/users
            const response = await fetch(`${backendUrl}/users`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: newUsername,
                        password: newPassword,
                        superuser: isSuperuser
                    }),
                });

            if (response.ok)
            {
                const data = await response.json();
                console.log('User created:', data);
                onUserCreated();
                onClose();
                setNewUsername('');
                setNewPassword('');
                setIsSuperuser(false);
            }
            else
            {
                const errorData = await response.json();
                setError(errorData.error || 'Failed to create user');
            }
        }
        catch (fetchError)
        {
            console.error('User creation network error:', fetchError);
            setError('Failed to connect to the server to create user.');
        }
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: handleCreateUserSubmit,
                    style: { minWidth: "300px" }
                }
            }}
        >
            <DialogTitle>Create New User</DialogTitle>
            <DialogContent>
                {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
                <TextField
                    autoFocus
                    margin="dense"
                    id="new-username"
                    label="Username"
                    type="text"
                    fullWidth
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="new-password"
                    label="Password"
                    type="password"
                    fullWidth
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                    <input
                        type="checkbox"
                        id="is-superuser"
                        checked={isSuperuser}
                        onChange={(e) => setIsSuperuser(e.target.checked)}
                    />
                    <label htmlFor="is-superuser" style={{ marginLeft: '8px' }}>Grant Superuser Privileges</label>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button type="submit" variant="contained">Create User</Button>
            </DialogActions>
        </Dialog>
    );
}

export default UserCreateDialog;