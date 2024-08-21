import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/productRoutes.js';

dotenv.config()

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api", router);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`App is connected to the database.`)
    } catch (error) {
        console.error(`Error connecting to DB: ${error.message}`);
        process.exit(1);
    }
}

const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`App is listening on port ${PORT}`);
        })
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
}
startServer();


