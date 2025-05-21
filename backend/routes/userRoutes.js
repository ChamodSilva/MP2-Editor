const express = require('express');
const fs = require('fs/promises');
const path = require('path');
const router = express.Router();
const User = require('../models/User.js');

const USERS_FILE = path.join(__dirname, '../data/users/users.json');

async function readUsersFile()
{
    // READ USERS FILE
    // TYPE: fs.readFile 
    try
    {
        const data = await fs.readFile(USERS_FILE, 'utf8');
        return JSON.parse(data);
    }
    catch (error)
    {
        if (error.code === 'ENOENT')
        {
            console.log('users.json not found, returning empty array.');
            return [];
        }
        console.error("Error reading users file:", error);
        throw error;
    }
}

async function writeUsersFile(users)
{
    // WRITE USERS FILE
    // TYPE: fs.writeFile 
    try
    {
        const usersToSave = users.map(user =>
        {
            if (user instanceof User)
            {
                return {
                    username: user.username,
                    password: user.password,
                    superuser: user.superuser,
                    joinDate: user.joinDate ? user.joinDate.toISOString() : undefined,
                    lastLoggedIn: user.lastLoggedIn ? user.lastLoggedIn.toISOString() : undefined,
                    lastUpdate: user.lastUpdate ? user.lastUpdate.toISOString() : undefined,
                    profilePicture: user.profilePicture,
                    bio: user.bio,
                    location: user.location
                };
            }
            return user;
        });
        await fs.writeFile(USERS_FILE, JSON.stringify(usersToSave, null, 2), 'utf8');
    }
    catch (error)
    {
        console.error("Error writing users file:", error);
        throw error;
    }
}

// User Creation Endpoint
// POST /api/users
router.post('/api/users', async (req, res) =>
{
    const { username, password, superuser } = req.body;

    if (!username || !password)
    {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try
    {
        const users = await readUsersFile();

        if (users.some(user => user.username === username))
        {
            return res.status(409).json({ error: 'Username already exists.' });
        }

        const newUser = new User(
            username,
            password,
            !!superuser,
            new Date()
        );

        users.push({
            username: newUser.username,
            password: newUser.password,
            superuser: newUser.superuser,
            joinDate: newUser.joinDate.toISOString(),
            lastLoggedIn: newUser.lastLoggedIn.toISOString(),
            lastUpdate: newUser.lastUpdate.toISOString(),
            profilePicture: newUser.profilePicture,
            bio: newUser.bio,
            location: newUser.location
        });

        await writeUsersFile(users);

        res.status(201).json({
            message: 'User created successfully',
            user: { username: newUser.username, superuser: newUser.superuser }
        });
    }
    catch (error)
    {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// User Login Endpoint
// POST /api/login
router.post('/api/login', async (req, res) =>
{
    const { username, password } = req.body;

    try
    {
        const usersData = await readUsersFile();
        const user = usersData.find(u => u.username === username);

        if (!user || user.password !== password)
        {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        res.status(200).json({
            message: `Login successful for user ${username}!`,
            username: user.username,
            superuser: user.superuser
        });
    }
    catch (error)
    {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = {
    router: router,
    readUsersFile: readUsersFile,
    writeUsersFile: writeUsersFile
};
