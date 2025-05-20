const { DEFAULT_AVATAR } = require('../utils/constants.js');

class User
{
    constructor(username, password, superuser, joinDate)
    {
        this.superuser = superuser;
        this.username = username;
        this.password = password;
        this.joinDate = joinDate;
        this.lastLoggedIn = joinDate;
        this.lastUpdate = joinDate;
        this.profilePicture = DEFAULT_AVATAR;
        this.bio = '';
        this.location = '';
    }

    updateLastLoggedIn()
    {
        this.lastLoggedIn = new Date();
    }

    updateLastUpdate()
    {
        this.lastUpdate = new Date();
    }

    setBio(bio)
    {
        this.bio = bio;
        this.updateLastUpdate();
    }

    setLocation(location)
    {
        this.location = location;
        this.updateLastUpdate();
    }
}

module.exports = User;