import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';
import authRoutes from './auth';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Important for cookies
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);

app.get('/api/health', (req: Request, res: Response) => {
    res.status(200).json({ status: 'ok', message: 'Backend is running correctly!' });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
