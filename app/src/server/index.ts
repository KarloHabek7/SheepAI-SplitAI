import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { requestLogger } from './middleware/requestLogger.js';
import { errorHandler } from './middleware/errorHandler.js';
import chatRouter from './routes/chat.js';
import reportRouter from './routes/report.js';
import adminRouter from './routes/admin.js';
import parkingRouter from './routes/parking.js';
import transitRouter from './routes/transit.js';
import crowdRouter from './routes/crowd.js';
import emergencyRouter from './routes/emergency.js';
import { seedReports } from './store.js';

// Seed demo data on startup
seedReports();

// Load environment variables from .env file
dotenv.config({ path: '../.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------

// CORS — allow frontend dev server
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Vite dev server
      'http://localhost:4173', // Vite preview
    ],
    credentials: true,
  })
);

// JSON body parser with 10MB limit for base64 image payloads
app.use(express.json({ limit: '10mb' }));

// Request logging
app.use(requestLogger);

// ---------------------------------------------------------------------------
// System Endpoints
// ---------------------------------------------------------------------------

/** GET /api/health — Server health check */
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      cacheReady: false,
    },
    timestamp: new Date().toISOString(),
  });
});

/** POST /api/cache/init — Context cache initialization stub */
app.post('/api/cache/init', (_req, res) => {
  res.json({
    success: true,
    data: {
      cacheId: '',
      status: 'pending',
    },
    timestamp: new Date().toISOString(),
  });
});

// ---------------------------------------------------------------------------
// Route Handlers
// ---------------------------------------------------------------------------

// Task 02 — POST /api/chat
app.use('/api/chat', chatRouter);

// Task 03 — Civic Reports
app.use('/api/report', reportRouter);  // For /analyze and /submit
app.use('/api/reports', reportRouter); // For listing
// TODO: Task 04 — POST /api/pazar/analyze, POST /api/pazar/submit, GET /api/pazar/feed
// Task 05 — Admin Dashboard
app.use('/api/admin', adminRouter);

// Task 06 — Utility Routes
app.use('/api/parking', parkingRouter);
app.use('/api/transit', transitRouter);
app.use('/api/crowd', crowdRouter);
app.use('/api/emergency', emergencyRouter);

// ---------------------------------------------------------------------------
// Error Handler (must be LAST)
// ---------------------------------------------------------------------------
app.use(errorHandler);

// ---------------------------------------------------------------------------
// Start Server
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`\n🐑 SplitAI BFF Server running on http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health\n`);
});

export default app;
