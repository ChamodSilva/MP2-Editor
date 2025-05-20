const express = require('express');
const router = express.Router();
const { authenticateUser } = require('../middlewares/authenticateUser');
const fs = require('node:fs/promises');
const path = require('path');

function getUserFilePath(username)
{
    return path.join(__dirname, `../data/users/${username}/floating/code_page.json`);
}

// SAVE CODE
// POST /api/save
router.post('/api/save', authenticateUser, async (req, res) =>
{
    try
    {
        const { code } = req.body;
        const filePath = getUserFilePath(req.user);
        const dirname = path.dirname(filePath);

        try
        {
            await fs.access(dirname);
        }
        catch (error)
        {
            if (error.code === 'ENOENT')
            {
                await fs.mkdir(dirname, { recursive: true });
            }
            else
            {
                console.error('Error accessing directory:', error);
                return res.status(500).json({ error: 'Failed to access directory.' });
            }
        }
        await fs.writeFile(filePath, JSON.stringify({ code }));
        res.json({ message: `Code saved successfully for user ${req.user}!` });
    }
    catch (error)
    {
        console.error('Error saving code:', error);
        res.status(500).json({ error: 'Failed to save code.' });
    }
});

// LOAD CODE
// GET /api/load
router.get('/api/load', authenticateUser, async (req, res) =>
{
    try
    {
        const filePath = getUserFilePath(req.user);
        const data = await fs.readFile(filePath, 'utf-8');
        const parsedData = JSON.parse(data);
        res.json({ code: parsedData.code || '' });
    }
    catch (error)
    {
        if (error.code === 'ENOENT')
        {
            res.json({ code: '' });
            return;
        }
        console.error('Error loading code:', error);
        res.status(500).json({ error: 'Failed to load code.' });
    }
});

module.exports = router;