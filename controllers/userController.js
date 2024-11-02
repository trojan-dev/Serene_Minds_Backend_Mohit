// controllers/userController.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup Controller
async function signup(req, res) {
  const { username, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUserQuery = 'SELECT * FROM users WHERE email = $1';
    const existingUserResult = await pool.query(existingUserQuery, [email]);

    if (existingUserResult.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user
    const insertUserQuery =
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *';
    const newUserResult = await pool.query(insertUserQuery, [
      username,
      email,
      hashedPassword,
    ]);

    const newUser = newUserResult.rows[0];

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(201).json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error signing up user' });
  }
}

// Login Controller
async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(userQuery, [email]);

    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const user = userResult.rows[0];

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in user' });
  }
}

// Get All Users Controller
async function getAllUsers(req, res) {
  try {
    const getUsersQuery = 'SELECT id, username, email FROM users';
    const usersResult = await pool.query(getUsersQuery);

    res.status(200).json(usersResult.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching users' });
  }
}

module.exports = { signup, login, getAllUsers };
