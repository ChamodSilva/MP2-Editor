import { useState, useEffect } from "react";
import { Typography, Box, Button } from "@mui/material";
import JSEditor from "../components/JSEditor";
function EditPage()
{
    const [code, setCode] = useState('');
    const backendUrl = 'http://localhost:3001/api'; // Adjust if your backend runs on a different host/port

    // Function to handle changes in the Ace Editor
    const handleCodeChange = (newCode) => {
        setCode(newCode);
    };

    // Function to save the code to the backend
    const handleSave = async () => {
        try {
        const response = await fetch(`${backendUrl}/save`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
        });

        if (response.ok) {
            const data = await response.json();
            alert(data.message); // Show a success message
        } else {
            const errorData = await response.json();
            alert(`Failed to save: ${errorData.error || 'Unknown error'}`);
        }
        } catch (error) {
        console.error('Error saving code:', error);
        alert('Failed to connect to the server to save.');
        }
    };

    // Function to load the code from the backend when the component mounts
    useEffect(() => {
        const loadCode = async () => {
        try {
            const response = await fetch(`${backendUrl}/load`);
            if (response.ok) {
            const data = await response.json();
            setCode(data.code);
            } else {
            const errorData = await response.json();
            console.error('Failed to load code:', errorData.error || 'Unknown error');
            // Optionally set a default empty code or show an alert
            }
        } catch (error) {
            console.error('Error loading code:', error);
            // Optionally set a default empty code or show an alert
        }
        };

        loadCode();
    }, []); // Empty dependency array means this runs only once after the initial render

    return(
        <Box sx={{ flexGrow: 1,}}>
            <Typography>This is a EditPage container.</Typography>
            <Box sx={{borderRadius: "20px", backgroundColor: "#669999", padding: 1}}>
                <JSEditor onChange={handleCodeChange} value={code} />
                <Button variant="contained" onClick={handleSave} sx={{ mt: 2}}>
                    Save Code
                </Button>
                    <Box>
                    <h3>Current Code:</h3>
                    <pre>{code}</pre>
                </Box>
            </Box>
        </Box>
    );
};

export default EditPage;