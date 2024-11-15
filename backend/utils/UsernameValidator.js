import { body } from 'express-validator'


export const ValidateUsername = [
    body('username')
    .isString().withMessage('Username must be a string.')
    .isLowercase().withMessage('Username should be in lowercase')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores.')
]
