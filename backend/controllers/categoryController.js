import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

// @desc    Fetch all categories
// @route   GET /api/categories
// @access  Private
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}); // Empty object stands for get all categories
  res.json(categories);
  // console.log(res.json(categories));
});

export { getCategories };
