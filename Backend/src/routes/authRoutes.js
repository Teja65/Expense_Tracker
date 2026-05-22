// import express from 'express';
// import { login } from '../controllers/authController.js';

// const router = express.Router();

// router.post('/login', login);

// export default router;

import express from 'express';

import {
  login,
  getMe,
  logout,
  checkEmail,
} from '../controllers/authController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);

router.get('/check-email', checkEmail);

router.get('/me', authMiddleware, getMe);

router.post('/logout', logout);

export default router;
