const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const socketIo = require('socket.io');
const http = require('http');
const nodemailer = require("nodemailer");
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const db = require("./app/models");
const registerRouter = require("./app/controllers/Registration.controller");
const loginRouter = require("./app/controllers/Login.controller");
const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use(bodyParser.json());
app.use(cookieParser());

require('dotenv').config();
app.use("/api/register", registerRouter);
app.use("/api/login", loginRouter);

db.mongoose
	.connect(db.url, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
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


