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

        const targetCategory = await Category.findById(newCategoryObjectId);
        if (!targetCategory) {
            return res.status(404).json({ message: 'Target category not found' });
        }

        const originalCategory = await Category.findOne({ 'subCategories._id': subcategoryObjectId });
        if (!originalCategory) {
            return res.status(404).json({ message: 'Subcategory not found in the original category' });
        }

        // Find the subcategory in the original category
        const subcategoryToMove = originalCategory.subCategories.find(sub => sub._id.equals(subcategoryObjectId));
        if (!subcategoryToMove) {
            return res.status(404).json({ message: 'Subcategory not found in the original category' });
        }

        // Remove the subcategory from its original category
        originalCategory.subCategories = originalCategory.subCategories.filter(
            (sub) => !sub._id.equals(subcategoryObjectId)
        );
        await originalCategory.save();

        // Prepare the updated subcategory object
        const updatedSubcategory = {
            _id: subcategoryObjectId,
            name: name,
            categoryId: newCategoryObjectId,
            images: subcategoryImage || [], // Handle images correctly
        };

        // Add the updated subcategory to the new category
        targetCategory.subCategories.push(updatedSubcategory);
        await targetCategory.save();

        return res.status(200).json({ success: true, message: 'Subcategory updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the subcategory' });
    }
};

module.exports = updateSubcategoryController;

