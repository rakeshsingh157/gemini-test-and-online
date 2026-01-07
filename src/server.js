import express from 'express';
import cron from 'node-cron';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { ENV } from './config/env.js';
import { DailyJob, dashboardData } from './jobs/dailyTest.js';

// Setup Directory Paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.join(__dirname, '..'); // Up one level from src

const app = express();
app.use(cors());
app.use(express.static(path.join(ROOT_DIR, 'public')));

// --- API ---
app.get('/api/status', (req, res) => {
    res.json(dashboardData);
});

app.post('/api/trigger', async (req, res) => {
    console.log("⚠️ Manual Trigger Initiated");
    const results = await DailyJob.run();
    res.json(results);
});

// --- Scheduler ---
// Run every day at 09:00 AM
cron.schedule('0 9 * * *', () => {
    DailyJob.run();
});

// --- Start ---
app.listen(ENV.PORT, () => {
    console.log(`🚀 Gemini Sentinel Server running on http://localhost:${ENV.PORT}`);

    // Run an initial check on startup so dashboard isn't empty
    DailyJob.run();
});
