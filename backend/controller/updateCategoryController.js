const categoryModel = require('../models/Category');
const uploadCategoryPermission = require('../helpers/permission');

async function updateCategoryController(req, res) {
  try {
    if (!uploadCategoryPermission(req.userId)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const { id } = req.params; // Getting the category ID from route params
    const { name } = req.body;
    let image;

    if (req.file) {
      image = req.file.path; // Path where the file was saved (assuming you use multer for image uploads)
    }

    const updateData = { name };
    if (image) updateData.image = image;

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
