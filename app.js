const port = 8080; // We'll run the server on port 8080

// IMPORTS
const express = require('express');
const app = express();

// MIDDLEWARE
app.use(express.static('public'));

// ROUTES
app.get('/', (req, res) => {
   res.send('<h1>Hello World from Express!</h1>');
});

// START THE SERVER
const server = app.listen(port, () => {
   console.log("Waiting for requests on port %s", port);
});