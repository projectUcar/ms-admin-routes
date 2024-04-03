import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import helmet from "helmet";

import indexRoutes from "./routes/index.routes.js";
import routeFromUniversityRoutes from "./routes/routeFromUniversity.routes.js";
import routeToUniversityRoutes from "./routes/routeToUniversity.routes.js";


const app = express()

app.set('pkg', pkg)

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("json spaces", 4);

//TODO: add endpoints to express
app.use('/api/v1', indexRoutes)
app.use('/api/v1/routes-from-university', routeFromUniversityRoutes)
app.use('/api/v1/routes-to-university', routeToUniversityRoutes)


export default app;