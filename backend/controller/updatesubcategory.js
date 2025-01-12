const mongoose = require('mongoose');
const { isValidObjectId } = mongoose;
const Category = require('../models/Category'); // Adjust the path based on your file structure

const updateSubcategoryController = async (req, res) => {
    try {
        const { subcategoryId, newCategoryId, name, subcategoryImage } = req.body;

        if (!subcategoryId || !newCategoryId) {
            return res.status(400).json({ message: 'Subcategory ID and New Category ID are required' });
        }

        if (!isValidObjectId(subcategoryId) || !isValidObjectId(newCategoryId)) {
            return res.status(400).json({ message: 'Invalid ObjectId' });
        }

        const subcategoryObjectId = new mongoose.Types.ObjectId(subcategoryId);
        const newCategoryObjectId = new mongoose.Types.ObjectId(newCategoryId);

        // Find the target category directly
        const targetCategory = await Category.findById(newCategoryObjectId);
        if (!targetCategory) {
            return res.status(404).json({ message: 'Target category not found' });
        }

        // Update the subcategory directly in the new category
        const updatedSubcategory = {
            _id: subcategoryObjectId,
            name: name,
            categoryId: newCategoryObjectId,
            images: subcategoryImage || [], // Handle images correctly
        };

        // Update the original category by pulling the subcategory
        await Category.updateOne(
            { 'subCategories._id': subcategoryObjectId },
            { $pull: { subCategories: { _id: subcategoryObjectId } } }
        );

        // Add the subcategory to the new category
        await Category.updateOne(
            { _id: newCategoryObjectId },
            { $push: { subCategories: updatedSubcategory } }
        );

        return res.status(200).json({ success: true, message: 'Subcategory updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the subcategory' });
    }
};

module.exports = updateSubcategoryController;

