import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import ordersRoutes from './routes/orders';
import productsRoutes from './routes/products';
import stationsRoutes from './routes/stations';
import usersRoutes from './routes/users';
import { connectToDatabase } from './database/connection';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
connectToDatabase();

// Routes
app.use('/api/orders', ordersRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/stations', stationsRoutes);
app.use('/api/users', usersRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});