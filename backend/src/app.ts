import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
import errorHandler from './middleware/errorHandler';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(express.json());

// Configure CORS to allow both localhost and Vercel deployment
const allowedOrigins = [
  'http://localhost:5000',
  'https://task-management-system-ci2ch5joi.vercel.app',
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    // Allow if the origin is in the allowedOrigins array
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  
  credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

export default app;
