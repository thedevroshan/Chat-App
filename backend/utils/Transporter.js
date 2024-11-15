import nodemailer from 'nodemailer'
import { configuration } from '../config/config.js'

export const Transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: configuration.EMAIL,
        pass: configuration.EMAIL_PASS
    }
})