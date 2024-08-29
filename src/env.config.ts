import 'dotenv/config';

// Application Config
export const NODE_ENV = process.env.NODE_ENV;

// MongoDB Config
export const MongoDB_URI = process.env.MONGODB_URL || `mongodb://127.0.0.1:27017`;
export const MongoDB_NAME = process.env.MONGODB_NAME || 'URLSHORTENER';

// Server Config
export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const SERVER_HOST = process.env.SERVER_HOST || 'http://localhost';
export const API_URL = `${SERVER_HOST}:${SERVER_PORT}`; // 'http://localhost:3000'