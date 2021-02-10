import express from 'express';
const router = express.Router();
import { getCategories } from '../controllers/categoryController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').get(getCategories);

export default router;
