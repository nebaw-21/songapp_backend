import User from "../models/user.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const registerUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const saltRounds = 10; 
        const salt = await bcrypt.genSalt(saltRounds);

        const hashPassword = await bcrypt.hash(req.body.password, salt);

        
        const newUser = new User({
            name:req.body.name,
            email: req.body.email,
            password: hashPassword
            
        });
        await newUser.save();

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
    
        res.status(500).json({ message: error.message });
    }
};


const loginUser = async (req, res) => {
  try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
          return res.status(400).json({ error: "User doesn't exist" });
      }

      const validPassword = await bcrypt.compare(req.body.password, user.password);

      if (!validPassword) {
          return res.status(400).json({ error: "Invalid password" });
      }

      if (req.body.email !== user.email) {
          return res.status(400).json({ error: "Invalid email" });
      }

      const token = user.generateAuthToken();
      res.status(200).json({ data: token, message: "Logged in successfully" });
  } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Internal server error" });
  }
};


const getUser = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }

    return res.status(401).json({ message: 'Invalid token' });
  }
};

export { registerUser, loginUser, getUser };
