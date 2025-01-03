import { body } from 'express-validator'


export const ValidatePassword = [
    body('password')
      .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long.')
      .matches(/[A-Z]/).withMessage('Password must include at least one uppercase letter.')
      .matches(/[a-z]/).withMessage('Password must include at least one lowercase letter.')
      .matches(/[0-9]/).withMessage('Password must include at least one number.')
      .matches(/[\W_]/).withMessage('Password must include at least one special character (e.g., @, #, $, etc.).')
  ];