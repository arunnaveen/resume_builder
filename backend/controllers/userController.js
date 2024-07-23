const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { name, password, email } = req.body;

  try {
    // Check for Null value
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    let users = await User.findOne({ email });

    if (users) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    if (newUser) {
      return res.status(201).json({
        _id: newUser.id,
        name: newUser.name,
        token: generateJwt(newUser.id)
      });
    }

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if (isMatch) {
      return res.status(200).json({
        _id: user.id,
        name: user.name,
        token: generateJwt(user.id)
      });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server error');
  }
};

const generateJwt = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '20d' });
};

module.exports = { signup, login };
