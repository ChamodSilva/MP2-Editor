const express = require('express');
const cors = require('cors');
const fs = require('node:fs/promises'); // For file system operations
const path = require('node:path');

const app = express();
const port = 3001; // You can choose a different port if you like

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

const DATA_FILE_PATH = path.join(__dirname, 'saved_code.json');

// Route to save the code
app.post('/api/save', async (req, res) => {
    try {
        const { code } = req.body;
        await fs.writeFile(DATA_FILE_PATH, JSON.stringify({ code }));
        res.json({ message: 'Code saved successfully!' });
    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).json({ error: 'Failed to save code.' });
    }
});

// Route to load the code
app.get('/api/load', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
        const parsedData = JSON.parse(data);
        res.json({ code: parsedData.code || '' });
    } catch (error) {
        // If the file doesn't exist yet, return an empty code
        if (error.code === 'ENOENT') {
            res.json({ code: '' });
            return;
        }
        console.error('Error loading code:', error);
        res.status(500).json({ error: 'Failed to load code.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});