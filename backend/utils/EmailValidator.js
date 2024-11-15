import { body } from 'express-validator'

export const ValidateEmail = [
    body('email').isEmail().withMessage('Email should be correct')
]