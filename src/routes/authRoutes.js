import { Router } from 'express';
import { celebrate } from 'celebrate';

import {
  loginUser,
  logoutUser,
  requestResetEmail,
  resetPassword,
  refreshUserSession,
  registerUser,
} from '../controllers/authController.js';
import {
  loginUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
  registerUserSchema,
} from '../validations/authValidation.js';

const router = Router();

router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
router.post('/auth/reset-password', celebrate(resetPasswordSchema), resetPassword);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/logout', logoutUser);

export default router;
