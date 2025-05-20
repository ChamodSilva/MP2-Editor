// EditPage.jsx
import { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import JSEditor from '../components/JSEditor';

// loggedInUser is an object, and userPassword is a direct prop
function EditPage({ loggedInUser, userPassword })
{
    const [code, setCode] = useState('');
    const backendUrl = 'http://localhost:3001/api';

    function handleCodeChange(newCode)
    {
        setCode(newCode);
    }

    async function handleSave()
    {
        // Ensure user is logged in and password is available
        if (!loggedInUser || !userPassword)
        {
            alert("You must be logged in to save code.");
            return;
        }

        try
        {
            const response = await fetch(`${backendUrl}/save`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'username': loggedInUser.username, // Access username from the object
                    'password': userPassword,           // Use the password prop
                },
                body: JSON.stringify({ code }),
            });

            if (response.ok)
            {
                const data = await response.json();
                alert(data.message);
            }
            else
            {
                const errorData = await response.json();
                alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
            }
        }
        catch (error)
        {
            console.error('Error saving code:', error);
            alert('Failed to connect to the server to save.');
        }
    }

    useEffect(() =>
    {
        async function loadCode()
        {
            // Only attempt to load if logged in and password is available
            if (!loggedInUser || !userPassword)
            {
                setCode(''); // Clear code if not logged in
                return;
            }

            try
            {
                const response = await fetch(`${backendUrl}/load`, {
                    headers: {
                        'username': loggedInUser.username, // Access username from the object
                        'password': userPassword,           // Use the password prop
                    },
                });
                if (response.ok)
                {
                    const data = await response.json();
                    setCode(data.code);
                }
                else
                {
                    const errorData = await response.json();
                    console.error('Failed to load code:', errorData.error || 'Unknown error');
                    setCode(''); // Clear code on load failure
                }
            }
            catch (error)
            {
                console.error('Error loading code:', error);
                setCode(''); // Clear code on network error
            }
        }

        // Trigger loadCode when loggedInUser or userPassword changes
        loadCode();
    }, [loggedInUser, userPassword]); // Dependencies for useEffect

    // Conditional rendering based on logged-in state
    if (!loggedInUser)
    {
        return (
            <Box sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" color="error">
                    Please log in to access the editor.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Typography>This is a EditPage container.</Typography>
            <Box sx={{ borderRadius: "20px", backgroundColor: "#669999", padding: 1 }}>
                <JSEditor onChange={handleCodeChange} value={code} />
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                    Save Code
                </Button>
                <Box>
                    <h3>Current Code:</h3>
                    <pre>{code}</pre>
                </Box>
            </Box>
        </Box>
    );
}

export default EditPage;