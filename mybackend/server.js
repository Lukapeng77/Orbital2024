
const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');
const path = require('path');
const bodyParser = require("body-parser");

app.use(cors()); // This will allow all CORS requests
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'yourDatabase',
	password: 'yourPassword',
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

// POST endpoint to create a new profile
app.post('/profile:username', async (req, res) => {
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

// Get user profile endpoint including additional fields
app.get('/profile:username', async (req, res) => {
    const { username } = req.params;

    try {
        const query = 
        'SELECT p.user_id, p.photo, p.bio, p.skills, p.projects, u.username, u.email, u.user_id FROM users u JOIN profiles p ON u.user_id = p.user_id WHERE u.username = $1';
        const result = await pool.query(query, [username]);

        if (result.rows.length > 0) {
            const userProfile = result.rows[0];

            // Convert photo from bytes to a suitable format if necessary
            if(userProfile.photo) {
                userProfile.photo = userProfile.photo.toString('base64'); // Example for converting to Base64
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




