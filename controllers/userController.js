// controllers/authController.js
const prisma = require('../config/database');

// Login function to authenticate a user (service logic)
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email in the database
    const user = await prisma.user.findUnique({ where: { email }, });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'User not found',
      });
    }

    // Check password (in a real app, use bcrypt or a hashing library)
    if (user.password !== password) {
      return res.status(401).json({
        status: 'error',
        message: 'Invalid credentials',
      });
    }

    // Return the user if authentication is successful
    return res.status(200).json({
      status: 'success',
      message: 'Login successful',
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: error.message,
    });
  }
};

module.exports = {
  login, 
};
