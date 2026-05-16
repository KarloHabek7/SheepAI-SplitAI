import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routes/chat.js';
import reportRouter from './routes/report.js';
import adminRouter from './routes/admin.js';
import pazarRouter from './routes/pazar.js';
import parkingRouter from './routes/parking.js';
import transitRouter from './routes/transit.js';
import crowdRouter from './routes/crowd.js';
import emergencyRouter from './routes/emergency.js';
import authRouter from './routes/auth.js';
import { seedReports, seedPazarListings } from './store.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialize Data Store
seedReports();
seedPazarListings();

// Routes
app.use('/api/auth', authRouter);
app.use('/api/chat', chatRouter);

// Task 03 — Civic Reports
app.use('/api/report', reportRouter);  // For /analyze and /submit
app.use('/api/reports', reportRouter); // For listing

// Task 04 — Pazar Market
app.use('/api/pazar', pazarRouter);

// Task 05 — Admin Dashboard
app.use('/api/admin', adminRouter);

// Task 06 — Utility Routes
app.use('/api/parking', parkingRouter);
app.use('/api/transit', transitRouter);
app.use('/api/crowd', crowdRouter);
app.use('/api/emergency', emergencyRouter);

// Error Handling (Must be last)
app.use(errorHandler);

// Health Check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/', (_req, res) => {
  res.json({ message: 'SplitAI Backend API' });
});

// Start Server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server listening at http://0.0.0.0:${port}`);
});

export default app;
