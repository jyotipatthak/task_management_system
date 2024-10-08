import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: '1m',
    });

    res.status(200).json({ token,refreshToken });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

export const tokenRefresh = async (req: Request, res: Response) => {
  try {
    const prevRefreshToken = req.header('Authorization')?.replace('Bearer ', '');

    if (!prevRefreshToken) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }
  
    
      const decoded = jwt.verify(prevRefreshToken, process.env.JWT_SECRET!) as { id: number };
      const user = decoded 
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
      });
      
      res.status(200).json({ token });
   
  

   
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

