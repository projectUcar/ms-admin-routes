import { config } from "dotenv";
config();

export const SECRET_KEY = process.env.SECRET;
export const MONGODB_URI = process.env.MONGODB_URI;
