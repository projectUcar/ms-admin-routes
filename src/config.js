import { config } from "dotenv";
config();

export const SECRET_KEY = process.env.SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 3000;
export const AUTH_MS_URL = process.env.AUTH_MS_URL;
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
export const VEHICLE_BY_ID_URL = process.env.VEHICLE_BY_ID_URL;
