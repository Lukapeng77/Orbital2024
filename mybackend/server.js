
const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
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

// PostgreSQL connection setup
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'SUPpeer',//yourDatabase
	password: 'Pzy20020805%',//yourPassword
	port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Connection to database failed:', err);
    } else {
      console.log('Connection to database successful:', res.rows[0]);
    }
  });

// Example endpoint to fetch data
app.get('/users', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM public.users');
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
        pool.end();// Close the pool when you're done with it
	}
});

const PORT = process.env.PORT || 3001;
//Register endpoint 
app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;
    
	try {
        // First, check if the user already exists
        const existingUser = await pool.query(
            'SELECT user_id FROM public.users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            // User already exists
            return res.status(409).send("User already exists with the given username or email.");
        }

        // If user does not exist, insert new user into database
		const result = await pool.query(
			'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING user_id',
			[username, email, password]
		);
		res.status(201).send({ userId: result.rows[0].id, message: "User created successfully" });
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).send("Failed to register user");
	}
});

// Simulating a database
let users = [{ username: 'user1', email: 'user1@example.com', password: 'pass123' }];

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',  // Replace with your mail server host
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'your-email@example.com',  // your email
    pass: 'your-password'            // your email password
  }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM public.users WHERE username = $1', [username]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];

            // Check if the hashed password in the database matches the one provided
            const isValid = user.password;

            if (isValid === password) {
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

// Get user profile endpoint 
app.get('/profile/:username', async (req, res) => {
    const { username } = req.params;

    try { 
        const query = `
            SELECT u.user_id, u.username, u.email, p.photo, p.bio, p.skills, p.projects
            FROM users u
            JOIN profiles p ON u.user_id = p.user_id
            WHERE u.username = $1;
        `;
        const result = await pool.query(query, [username]);

        if (result.rows.length > 0) {
            const userProfile = result.rows[0];

            // Convert photo from bytes to a suitable format
            if(userProfile.photo) {
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

//Update a user profile
app.put('/profile/:username', async (req, res) => {
    const { username } = req.params;
    const { email, photo, bio, skills, projects } = req.body;

    try {
        // Retrieve the user_id based on the username
        const userResult = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Username not found' });
        }
        const user_id = userResult.rows[0].user_id;

        // Update the profile in the database
        const updateQuery = `
            UPDATE profiles
            SET email = $2, photo = $3, bio = $4, skills = $5, projects = $6
            WHERE user_id = $1
            RETURNING *;
        `;
        const result = await pool.query(updateQuery, [user_id, email, photo, bio, skills, projects]);

        if (result.rows.length > 0) {
            res.status(200).json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Profile not updated' });
        }
    } catch (err) {
        console.error('Error updating user profile:', err);
        res.status(500).send('Server error');
    }
});

// POST endpoint to create a new profile
app.post('/profile/:username', async (req, res) => {
    const { username, email, bio, skills, projects } = req.body;
    try {
        // Firstly retrieve the user_id based on the username
        const userResult = await pool.query('SELECT user_id FROM users WHERE username = $1', [username]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Username not found' });
        }
        // Extract the user_id from the query result
        const user_id = userResult.rows[0].user_id;

        const result = await pool.query(
            'INSERT INTO profiles (user_id, username, email, bio, skills, projects) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [user_id, username, email, bio, skills, projects]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});


// Configure multer for file upload
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
	cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
	cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
    }
});
const upload = multer({ storage: storage });

app.post('/api/forum', upload.single('media'), (req, res) => {
// Handle the incoming post
    console.log(req.body.content); // Text content of the post
    console.log(req.file); // Information about the file
    res.send({ status: 'success', message: 'Post created successfully!' });
});*/

// Set up storage for file uploads
/*const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Make sure this directory exists
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

// Routes
app.post('/api/forum/posts', upload.single('media'), (req, res) => {
    console.log('Received text:', req.body.content);
    console.log('Received file:', req.file);
    res.json({ message: 'Successfully uploaded post and file!' });
});

// Serve files from the uploads directory
app.use('/uploads', express.static('uploads'));*/

//Real-time Forum 
/*const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*", // For development, allow all origins
    methods: ["GET", "POST"]
  }
});

let posts = []; // This will store the forum posts

io.on('connection', (socket) => {
  console.log('New client connected');

  // Emit existing posts to the new client
  socket.emit('updatePosts', posts);

  // Listen for new posts from the client
  socket.on('newPost', (post) => {
    const newPost = {
        ...post,
        id: posts.length + 1,
        votes: 0,
        replies: [],
        timestamp: new Date().toISOString()
    };
    posts.push(newPost); // Save the post
    io.emit('updatePosts', posts); // Update all clients
  });
    
    // Listen for votes on posts
    socket.on('votePost', ({ postId, delta }) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.votes += delta;
            io.emit('updatePosts', posts); // Update all clients
        }
    });

    // Listen for replies to posts
    socket.on('replyToPost', ({ postId, content }) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            const reply = {
                content,
                user: "Anonymous", // Replace with actual user data if available
                id: posts.length + 1,
                votes: 0,
                replies: [],
                timestamp: new Date().toISOString()
            };
            post.replies.push(reply);
            io.emit('updatePosts', posts); // Update all clients
        }
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
        });
    });*/


