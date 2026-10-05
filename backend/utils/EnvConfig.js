// config/env.js
import dotenv from 'dotenv';

// Load variables into process.env
const result = dotenv.config();

if (result.error) {
    console.warn('⚠️ Warning: .env file not found or failed to load. Falling back to default environment variables.');
}



// Export a structured config object with default fallbacks
const envConfig = {
    port: parseInt(process.env.PORT) || 3000,
    stripeKey: process.env.STRIPE_KEY || "STRIPE_KEY",
    mongoUri: process.env.MONGO_URI || "MONGO_URI",
    jwtSecret: process.env.JWT_SECRET || "JWT_SECRET",
    cookieSecret: process.env.COOKIE_SECRET || "COOKIE_SECRET",
    googleClientId: process.env.GOOGLE_CLIENT_ID || "GOOGLE_CLIENT_ID",
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "GOOGLE_CLIENT_SECRET",
    dummyPass: process.env.DUMMY_PASS || "DUMMY_PASS",
    mongodbUser: process.env.MONGODB_USER || "MONGODB_USER",
    mongodbPassword: process.env.MONGODB_PASSWORD || "MONGODB_PASSWORD",
    firebaseKey: process.env.FIREBASE_KEY || "FIREBASE_KEY",
    emailUser: process.env.EMAIL_USER || "EMAIL_USER",
    emailAppPass: process.env.EMAIL_APP_PASS || "EMAIL_APP_PASS",
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME || "CLOUDINARY_CLOUD_NAME",
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "CLOUDINARY_API_KEY",
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "CLOUDINARY_API_SECRET",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173"

};

export default envConfig;

