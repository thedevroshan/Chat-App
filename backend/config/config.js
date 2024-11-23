import dotenv from 'dotenv'
dotenv.config()

export const configuration = {
    PORT: process.env.PORT,
    IS_DEV_ENV: process.env.NODE_ENV=='development'?true:false,
    MONGODB: process.env.MONGO_URL,
    SALT_LENGTH: parseInt(process.env.SALT_LENGTH),
    EMAIL: process.env.EMAIL,
    EMAIL_PASS: process.env.EMAIL_PASSWORD,
    OTP_LENGTH: process.env.OTP_LENGTH,
    OTP_EXPIRATION_IN_MINUTES: process.env.OTP_EXPIRATION_IN_MINUTES,
    JWT_SECRET: process.env.JWT_SECRET,
    FRONTEND: process.env.FRONTEND,
    FRONTEND_PORT: process.env.FRONTEND_PORT,
    APPWRITE_ENDPOINT: String(process.env.APPWRITE_ENDPOINT),
    APPWRITE_PROJECT_ID: String(process.env.APPWRITE_PROJECT_ID),
    PROFILEPIC_BUCKET_ID : String(process.env.PROFILEPIC_BUCKET_ID),
    APPWRITE_API_KEY: String(process.env.APPWRITE_API_KEY)
}