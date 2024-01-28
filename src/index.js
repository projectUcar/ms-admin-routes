import app from "./app";
import { PORT } from "./config.js";
import './database'

app.listen(PORT);
console.log('Server listening on port', PORT);