import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import authRouter from './routes/authRoutes.js';
import { notesRouter } from './routes/notesRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(authRouter);
app.use(notesRouter);
app.use(userRouter);

app.use(errors());
app.use(notFoundHandler);
app.use(errorHandler);

const bootstrap = async () => {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
