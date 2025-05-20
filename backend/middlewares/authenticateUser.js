const User = require('../models/User.js');
const userRoutes = require('../routes/userRoutes');

let usersDataCache = {};

async function loadUsersFromServer()
{
    try
    {
        const rawUsersData = await userRoutes.readUsersFile();
        const tempUsers = {};
        for (const userData of rawUsersData)
        {
            const joinDate = userData.joinDate ? new Date(userData.joinDate) : new Date();
            const newUserInstance = new User(
                userData.username,
                userData.password,
                userData.superuser,
                joinDate
            );

            newUserInstance.lastLoggedIn = userData.lastLoggedIn ? new Date(userData.lastLoggedIn) : joinDate;
            newUserInstance.lastUpdate = userData.lastUpdate ? new Date(userData.lastUpdate) : joinDate;
            newUserInstance.profilePicture = userData.profilePicture || newUserInstance.profilePicture;
            newUserInstance.bio = userData.bio || newUserInstance.bio;
            newUserInstance.location = userData.location || newUserInstance.location;

            tempUsers[userData.username] = newUserInstance;
        }
        usersDataCache = tempUsers;
        console.log("user accounts loaded");
    }
    catch (error)
    {
        console.error("Failed to load in-memory users from server:", error);
        usersDataCache = {};
    }
}

loadUsersFromServer();

async function authenticateUser(req, res, next)
{
    console.log("Authenticating...");
    const { username, password } = req.headers;
    console.log('Username:', username);
    console.log('Password:', password);

    await loadUsersFromServer();

    if (usersDataCache[username] && usersDataCache[username].password === password)
    {
        req.user = username;
        usersDataCache[username].updateLastLoggedIn();
        await userRoutes.writeUsersFile(Object.values(usersDataCache));
        next();
    }
    else
    {
        res.status(401).json({ error: 'Authentication failed.' });
    }
}

module.exports = { authenticateUser, usersDataCache };