import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(403).json({ message: 'Access Denied' });
    }
    if (token.startsWith('Bearer')) {
      token = token.split(' ')[1];
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // search for user.
    const user = await User.findById(verified.id);
    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
