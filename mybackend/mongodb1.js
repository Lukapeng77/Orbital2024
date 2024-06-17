const express = require('express');
const multer = require('multer');
const { MongoClient, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");
const socketIo = require('socket.io');
const http = require('http');
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const mongoUrl = "mongodb://localhost:27017"; // 替换为你的 MongoDB 连接字符串
const dbName = "yourDatabase"; // 替换为你的数据库名称
let db;

MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.error('Failed to connect to the database. Error:', err);
        process.exit(1);
    }
    console.log("Connected to MongoDB successfully");
    db = client.db(dbName);
});

app.get('/users', async (req, res) => {
    try {
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3001;

app.post('/register', async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const existingUser = await db.collection('users').findOne({ $or: [{ username }, { email }] });

        if (existingUser) {
            return res.status(409).send("User already exists with the given username or email.");
        }

        const result = await db.collection('users').insertOne({ username, email, password });
        res.status(201).send({ userId: result.insertedId, message: "User created successfully" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).send("Failed to register user");
    }
});

let users = [{ username: 'user1', email: 'user1@example.com', password: 'pass123' }];

const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',  // Replace with your mail server host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com',  // your email
    pass: 'your-password'            // your email password
  }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.collection('users').findOne({ username });

        if (user) {
            const isValid = user.password === password;

            if (isValid) {
                res.status(200).json({ message: "Login successful!" });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: "Server error during login" });
    }
});

app.post('/reset-password', (req, res) => {
    const { username } = req.body;
    const user = users.find(u => u.username === username);
    if (user) {
        const mailOptions = {
            from: '"Your App Name" <your-email@example.com>', // sender address
            to: user.email, // list of receivers
            subject: 'Password Reset Request', // Subject line
            text: 'Please click on the following link, or paste this into your browser to complete the process.', // plain text body
            html: '<b>Please click on the following link, or paste this into your browser to complete the process.</b>' // html body
          };
      
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log('Error sending email', error);
              res.status(500).send({ success: false, message: "Failed to send password reset email!" });
            } else {
              console.log('Email sent: ' + info.response);
      // In a real application, you'd send an email here

      console.log(`Reset password email sent to ${username}`);
      res.send({ success: true, message: "Reset password email sent!" });
    }
}); 
}else {
      res.status(404).send({ success: false, message: "User not found!" });
    }
  });

app.get('/profile/:username', async (req, res) => {
    const { username } = req.params;

    try {
        const userProfile = await db.collection('users').findOne({ username });

        if (userProfile) {
            if (userProfile.photo) {
                userProfile.photo = userProfile.photo.toString('base64'); 
            }

            res.status(200).json(userProfile);
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: "Server error while fetching profile" });
    }
});

app.put('/profile/:username', async (req, res) => {
    const { username } = req.params;
    const { email, photo, bio, skills, projects } = req.body;

    try {
        const result = await db.collection('users').updateOne(
            { username },
            { $set: { email, photo, bio, skills, projects } }
        );

        if (result.matchedCount > 0) {
            res.status(200).json({ message: 'Profile updated successfully' });
        } else {
            res.status(404).json({ message: 'Profile not updated' });
        }
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).send('Server error');
    }
});

app.post('/profile/:username', async (req, res) => {
    const { username, email, bio, skills, projects } = req.body;

    try {
        const existingUser = await db.collection('users').findOne({ username });
        if (!existingUser) {
            return res.status(404).json({ message: 'Username not found' });
        }

        const result = await db.collection('profiles').insertOne({
            user_id: existingUser._id,
            username,
            email,
            bio,
            skills,
            projects
        });

        res.status(201).json(result.ops[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});
