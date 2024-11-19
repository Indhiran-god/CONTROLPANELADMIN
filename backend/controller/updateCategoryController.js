const categoryModel = require('../models/Category');
const uploadCategoryPermission = require('../helpers/permission');

async function updateCategoryController(req, res) {
  try {
    // Check if the user has permission to update the category
    if (!uploadCategoryPermission(req.userId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params; // Get category ID from route parameters
    const { name } = req.body; // Get category name from request body
    let image;

    // Handle file uploads (assuming you use multer for image upload middleware)
    if (req.file) {
      image = req.file.path; // File path from multer
    }

    const updateData = { name };
    if (image) updateData.image = image;

    // Update category in the database
    const category = await categoryModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ success: true, message: 'Category updated successfully', category });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

module.exports = updateCategoryController;
