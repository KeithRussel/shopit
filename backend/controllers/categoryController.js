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

// @desc    Create a category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const category = new Category({
    name: 'Sample name',
    user: req.user._id,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

export { getCategories, createCategory };
