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

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'https://task-management-system-pi-three.vercel.app'
  ]
};

app.use(cors(corsOptions));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

app.use(errorHandler);

sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

export default app;
