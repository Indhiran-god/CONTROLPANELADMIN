const Category = require('../models/Category');

const addSubcategory = async (req, res) => {
    try {
        const { categoryName, name, image } = req.body;

        if (!categoryName || !name || !image) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const updatedCategory = await Category.findOneAndUpdate(
            { name: categoryName },
            { $push: { subCategories: { name, image } } },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ success: false, message: 'Category not found.' });
        }

        res.json({ success: true, message: 'Subcategory added successfully', data: updatedCategory.subCategories });
    } catch (error) {
        console.error('Subcategory added successfully');
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports = addSubcategory;
