const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const http = require('http');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const db = require("./app/models");
const registerRouter = require("./app/controllers/Registration.controller");
const loginRouter = require("./app/controllers/Login.controller");
const users = require("./app/routes/user.routes");
const posts = require("./app/routes/post.routes");
const comments = require("./app/routes/comment.routes");
const community = require("./app/routes/community.routes");
const messages = require("./app/routes/messages.routes");
const { authSocket, socketServer } = require("./socketServer");

const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cookieParser());

require('dotenv').config();
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/comments", comments);
app.use("/api/communities", community);
app.use("/api/messages", messages);

const httpServer = require("http").createServer(app);
const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3000", 
      "https://orbital2024.onrender.com" 
    ],
  },
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

db.mongoose
	.connect(db.url)
	.then(() => {
		console.log("Connected to the database!");
	})
	.catch(err => {
		console.log("Cannot connect to the database!", err);
		process.exit();
	});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});


