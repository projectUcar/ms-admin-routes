import app from "./app";
import { PORT } from "./config.js";
import './database'
import { startCronJobs } from './libs/cronJob.js';

app.listen(PORT);
console.log('Server listening on port', PORT);

// Inicia los cron jobs
startCronJobs();