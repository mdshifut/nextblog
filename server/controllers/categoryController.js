const catchError = require('../utils/catchError');
const slug = require('slug');
const CategoryModel = require('../models/CategoryModel');

// Create New category
const createCategory = async (req, res, next) => {
  try {
    const category = new CategoryModel({
      name: req.body.name,
      slug: slug(req.body.name)
    });

    await category.save();

    return res.json({
      message: 'Category created succesfully'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// get all category
const getAllCategory = async (req, res, next) => {
  try {
    const category = await CategoryModel.find();

    return res.json({
      category
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// Edit a category
const editCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { name } = req.body;

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      categoryId,
      name
    );

    if (!updatedCategory) {
      return res.json({
        message: 'Update failed'
      });
    }

    return res.json({
      message: 'Updated successfully'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

// Delete a category
const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    // Finally delete the comment
    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.json({
        message: 'Operation failed'
      });
    }

    return res.json({
      message: 'Delete successfully'
    });
  } catch (error) {
    return catchError(res, error);
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  editCategory,
  deleteCategory
};
