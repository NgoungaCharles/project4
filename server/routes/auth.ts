import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../db';

const router = express.Router();

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    
    const result = await query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    
    const user = result.rows[0];
    if (!user || !await bcrypt.compare(password, user.password_hash)) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );
    
    res.json({ token, user: { id: user.id, username: user.username } });
  } catch (error) {
    next(error);
  }
});

export const authRouter = router;