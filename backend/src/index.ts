import express from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import cookieParser from 'cookie-parser';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string);

// Log connection success or error
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB database');
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// CORS configuration
app.use(
    cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true,
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(7000, () => {
    console.log("Server running on localhost:7000!");
});