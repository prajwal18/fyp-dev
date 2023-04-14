require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();
const http = require('http').Server(app);

// Connection to the database
const db = require("./db/connect");

// Error handler middleware
const notFound = require('./error/not-found');
const errorHandler = require('./error/errorHandler');

// Middleware to handle POST request
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ extended: true }));

// Middleware to handle request from any source
app.use(cors());

// Middleware to serve static file
app.use("/public", express.static("public"));


// Socket IO to establish full duplex communication between server and client
const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

let users = [];

//Add this before the app.get() block
socketIO.on('connection', (socket) => {

    // Listens when a new user joins the server
    socket.on('newUser', (data) => {
        // Adds the new user to the list of users
        // user will contain the following properties: userId, socketId
        users.push(data);
        // sends the list of users to the client
        socketIO.emit('newUserResponse', users);
    })

    // sends the message to all the users on the server
    // message will contain the following properties: senderId, receiverId, conversationId
    socket.on('message', (data) => {
        console.log(data);
        if (users.find(user => user.userId === data.receiverId)) {
            const specificUsers = users.filter(user => user.userId === data.receiverId);
            // socket.broadcast.emit('messageSent', { senderId: data.senderId, conversationId: data.conversationId })

            specificUsers.forEach(user => {
                socket.to(user.socketId).emit('messageSent', { senderId: data.senderId, conversationId: data.conversationId })
            })
        }
    });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        // Upadates the list of usres when a user disconnects from the server
        users = users.filter((user) => user.socketId !== socket.id);
        // sends the list of users to the lient
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});
// Socket IO to establish full duplex communication between server and client


// Routes
app.use('/', require('./routes/api.routes'));


// Using error handlers
app.use(notFound); // When path is not valid
app.use(errorHandler);


// Setting up the connection to the database and starting the server
const port = process.env.SERVER_PORT || 8000;
const start = async () => {
    try {
        await db.mongooseConnect(process.env.LOCAL_MONGODB_CONNECTION_URL);
        http.listen(port, () => console.log(`The server is up and running on PORT: ${port}`));
    } catch (error) {
        console.log(error);
    }
}
start();