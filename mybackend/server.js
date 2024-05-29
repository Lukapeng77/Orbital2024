
const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const bcrypt = require('bcryptjs');

app.use(cors()); // This will allow all CORS requests
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
	user: 'Username',
	host: 'localhost',
	database: 'databaseName',
	password: 'yourPassword',
	port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Connection to database failed:', err);
    } else {
      console.log('Connection to database successful:', res.rows[0]);
      //pool.end();  // Close the pool when you're done with it
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
	}
});

const PORT = process.env.PORT || 3001;

app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	// Optional: Hash the password before storing it
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
        // First, check if the user already exists
        const existingUser = await pool.query(
            'SELECT id FROM users WHERE username = $1 OR email = $2',
            [username, email]
        );

        if (existingUser.rows.length > 0) {
            // User already exists
            return res.status(409).send("User already exists with the given username or email.");
        }

        // If user does not exist, insert new user into database
		const result = await pool.query(
			'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
			[username, email, hashedPassword]
		);
		res.status(201).send({ userId: result.rows[0].id, message: "User created successfully" });
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).send("Failed to register user");
	}
});

// Login endpoint
/*const findUserByUsernameAndPassword = async (username, password) => {
    // This should query your database and return user data if credentials match
    // For example purposes, this is a hardcoded check
    if (username === "testuser" && password === "password123") {
        return { id: 1, username: "testuser" }; // Simulated user object
    } else {
        return null;
    }
};*/

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM public.users WHERE username = $1', [username]);

        if (userResult.rows.length > 0) {
            const user = userResult.rows[0];

            // Check if the hashed password in the database matches the one provided
            const isValid = await bcrypt.compare(password, user.password);

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
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});*/


