import { config } from "dotenv";
config();

export const SECRET_KEY = process.env.SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
export const PORT = process.env.PORT || 3000;
export const AUTH_MS_URL = process.env.AUTH_MS_URL;
export const USER_SERVICE_URL = process.env.USER_SERVICE_URL;
export const VEHICLE_BY_ID_URL = process.env.VEHICLE_BY_ID_URL;
export const PORT_RABBIT = process.env.PORT_RABBIT;
export const USERNAME_RABBITMQ = process.env.USERNAME_RABBITMQ;
export const PASSWORD_RABBITMQ = process.env.PASSWORD_RABBITMQ;
export const HOSTNAME_RABBITMQ = process.env.HOSTNAME_RABBITMQ;
export const QUEUE=process.env.QUEUE;
