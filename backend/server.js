const express = require('express');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Import the code routes and user routes
const codeRoutes = require('./routes/codeRoutes');
const { router: userRouter } = require('./routes/userRoutes');

// Use the routes
app.use(codeRoutes);
app.use(userRouter);

app.listen(port, () =>
{
    console.log(`Server listening on port ${port}`);
});