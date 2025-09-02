const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
dotenv = require('dotenv');
dotenv.config();

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Compare with env credentials
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email !== adminEmail) {
      return res.status(401).json({ message: 'Invalid admin email' });
    }

    const isMatch = await bcrypt.compare(password, await bcrypt.hash(adminPassword, 10));
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid admin password' });
    }

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(200).json({
      message: 'Admin logged in successfully',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed', error: error.message });
  }
};
module.exports = { adminLogin };