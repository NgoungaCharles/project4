import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { authRouter } from './routes/auth';
import { queryRouter } from './routes/query';
import { errorHandler } from './middleware/errorHandler';
import { authMiddleware } from './middleware/auth';
import { checkDatabaseConnection } from './utils/checkConnection';

dotenv.config();

async function startServer() {
  // Check database connection before starting the server
  const isConnected = await checkDatabaseConnection();
  if (!isConnected) {
    console.error('Failed to connect to the database. Please check your configuration.');
    process.exit(1);
  }

  const app = express();
  const port = process.env.PORT || 3000;

  app.use(cors());
  app.use(express.json());

  // Public routes
  app.use('/api/auth', authRouter);

  // Protected routes
  app.use('/api/query', authMiddleware, queryRouter);

  app.use(errorHandler);

  app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
  });
}

startServer().catch(error => {
  console.error('Failed to start server:', error);
  process.exit(1);
});