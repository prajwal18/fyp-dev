require('dotenv').config();
const express = require("express");
const cors = require("cors");
const server = express();

// Connection to the database
const db = require("./db/connect");

// Error handler middleware
const notFound = require('./error/not-found');
const errorHandler = require('./error/errorHandler');
// Middleware to handle POST request
server.use(express.json({ limit: "200mb" }));
server.use(express.urlencoded({ extended: true }));
// Middleware to handle request from any source
server.use(cors());
// Middleware to server static file
server.use("/public", express.static("public"));
// Routes
server.use('/', require('./routes/api.routes'));
// Using error handlers
server.use(notFound); // When path is not valid
server.use(errorHandler);
// Setting up the connection to the database and starting the server
const port = process.env.SERVER_PORT || 8000;
const start = async () => {
    try {
        await db.mongooseConnect(process.env.LOCAL_MONGODB_CONNECTION_URL);
        server.listen(port, () => console.log(`The server is up and running on PORT: ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();