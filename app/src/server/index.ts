import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import chatRouter from './routes/chat.js';
import reportRouter from './routes/report.js';
import adminRouter from './routes/admin.js';
import parkingRouter from './routes/parking.js';
import transitRouter from './routes/transit.js';
import crowdRouter from './routes/crowd.js';
import emergencyRouter from './routes/emergency.js';
import { seedReports } from './store.js';
import reportsRouter from './routes/reports.js';
import { errorHandler } from './middleware/errorHandler.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/chat', chatRouter);

// Task 03 — Civic Reports
app.use('/api/report', reportRouter);  // For /analyze and /submit
app.use('/api/reports', reportRouter); // For listing

// Vision Service integration
app.use('/api/vision', reportsRouter);

// TODO: Task 04 — POST /api/pazar/analyze, POST /api/pazar/submit, GET /api/pazar/feed
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

// Start Server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

export default app;
