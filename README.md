# MP2-Editor
This is a simple web app. You can log in, write code, and save it. Admins can also make new users.

## What It Does
* Log In: Access your account.
* Code Editor: Write JavaScript.
* Save/Load Code: Keep your work.
* New Users (Admin Only): Create accounts.

## How To Run:
1. Install node packages in both `/frontend` and `/backend`.
2. While in the `/backend` directory run:
```
npm start
```
3. While in the `/frontend` directory run:
```
npm run dev
```
4. Connect to http://localhost:5173/

## Folder Structure
<details>
<summary>Show</summary>
<pre>
├── backend/
│   ├── data/
│   │   └── users/
│   │       └── users.json            # User accounts
│   ├── middlewares/
│   │   └── authenticateUser.js       # Login check
│   ├── models/
│   │   └── User.js                   # User blueprint
│   ├── routes/
│   │   ├── codeRoutes.js             # Code saving/loading
│   │   └── userRoutes.js             # User login/creation
│   ├── server.js                     # Server start
│   └── utils/
│       └── constants.js              # Small helpers
└── frontend/
    ├── public/
    ├── src/
    │   ├── App.jsx                   # Main app
    │   ├── AppRoutes.jsx             # Page links
    │   ├── components/
    │   │   ├── AppTitle.jsx          # App name
    │   │   ├── DesktopNavLinks.jsx   # Desktop menu
    │   │   ├── JSEditor.jsx          # Code editor
    │   │   ├── LoginDialog.jsx       # Login box
    │   │   ├── Navigation.jsx        # Top bar
    │   │   ├── UserAuthSection.jsx   # Login/logout buttons
    │   │   └── UserCreateDialog.jsx  # New user box
    │   ├── css/
    │   │   └── App.css
    │   │   └── Navigation.css
    │   └── EditPage.jsx              # Editor page
    │   └── index.js
    └── package.json
</pre>
</details>