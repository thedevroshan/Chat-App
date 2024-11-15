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
    JWT_SECRET: process.env.JWT_SECRET
}