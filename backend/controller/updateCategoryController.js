const Category = require('../models/Category'); // Assuming your model is located here

// Edit a category
const updateCategoryController = async (req, res) => {
    try {
        const { categoryId } = req.params; // Get category ID from URL params
        const { name, categoryImage } = req.body; // Get updated data from request body

        // Find and update the category
        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name, categoryImage }, // Fields to update
            { new: true } // Return the updated category
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Return the updated category
        res.status(200).json({ success: true, message: 'Category updated successfully!', updatedCategory });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ success: false, message: 'Server error', error });
    }
};

module.exports = updateCategoryController;
