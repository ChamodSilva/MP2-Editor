const User = require('../User'); // Import the User class

describe('User Class', () =>
{
    const initialDate = new Date('2023-01-01T10:00:00Z');
    const defaultAvatar = '../data/defaults/avatar.png'; // Match your constant

    // Test constructor
    test('should create a User instance with correct properties', () =>
    {
        const user = new User('testuser', 'password123', false, initialDate);

        expect(user.username).toBe('testuser');
        expect(user.password).toBe('password123');
        expect(user.superuser).toBe(false);
        expect(user.joinDate).toEqual(initialDate);
        expect(user.lastLoggedIn).toEqual(initialDate);
        expect(user.lastUpdate).toEqual(initialDate);
        expect(user.profilePicture).toBe(defaultAvatar);
        expect(user.bio).toBe('');
        expect(user.location).toBe('');
    });

    // Test superuser creation
    test('should create a superuser correctly', () =>
    {
        const adminUser = new User('admin', 'adminpass', true, initialDate);
        expect(adminUser.superuser).toBe(true);
    });

    // Test updateLastLoggedIn method
    test('updateLastLoggedIn should update lastLoggedIn date', () =>
    {
        const user = new User('testuser', 'password123', false, initialDate);
        const oldLastLoggedIn = user.lastLoggedIn;

        // Advance timers to simulate time passing for date comparison
        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-01-01T10:05:00Z'));

        user.updateLastLoggedIn();

        expect(user.lastLoggedIn).not.toEqual(oldLastLoggedIn);
        expect(user.lastLoggedIn).toEqual(new Date('2023-01-01T10:05:00Z'));

        jest.useRealTimers(); // Restore real timers
    });

    // Test setBio method
    test('setBio should update bio and lastUpdate date', () =>
    {
        const user = new User('testuser', 'password123', false, initialDate);
        const oldLastUpdate = user.lastUpdate;
        const newBio = 'A new bio.';

        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-01-01T10:10:00Z'));

        user.setBio(newBio);

        expect(user.bio).toBe(newBio);
        expect(user.lastUpdate).not.toEqual(oldLastUpdate);
        expect(user.lastUpdate).toEqual(new Date('2023-01-01T10:10:00Z'));

        jest.useRealTimers();
    });

    // Test setLocation method
    test('setLocation should update location and lastUpdate date', () =>
    {
        const user = new User('testuser', 'password123', false, initialDate);
        const oldLastUpdate = user.lastUpdate;
        const newLocation = 'New York';

        jest.useFakeTimers();
        jest.setSystemTime(new Date('2023-01-01T10:15:00Z'));

        user.setLocation(newLocation);

        expect(user.location).toBe(newLocation);
        expect(user.lastUpdate).not.toEqual(oldLastUpdate);
        expect(user.lastUpdate).toEqual(new Date('2023-01-01T10:15:00Z'));

        jest.useRealTimers();
    });
});