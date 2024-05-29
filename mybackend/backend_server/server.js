
const express = require('express');
const multer = require('multer');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

app.use(cors()); // This will allow all CORS requests
app.use(express.json()); // For parsing application/json

// PostgreSQL connection setup
/*const pool = new Pool({
	user: 'yourUsername',
	host: 'localhost',
	database: 'yourDatabase',
	password: 'yourPassword',
	port: 5432,
});*/

// Example endpoint to fetch data
/*app.get('/api/data', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM your_table');
		res.json(result.rows);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server error');
	}
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

app.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	// Optional: Hash the password before storing it
	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		const result = await pool.query(
			'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id',
			[username, email, hashedPassword]
		);
		res.status(201).send({ userId: result.rows[0].id, message: "User created successfully" });
	} catch (error) {
		console.error('Registration error:', error);
		res.status(500).send("Failed to register user");
	}
});*/


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

