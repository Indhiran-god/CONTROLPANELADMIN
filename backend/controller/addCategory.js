const Category = require('../models/Category'); // Import the Category model

// Controller to add a new category
const addCategory = async (req, res) => {
    try {
        const { name, images, subCategories } = req.body; // Get category details from the request body

        // Validate input
        if (!name || !images || !Array.isArray(images)) {
            return res.status(400).json({ success: false, message: 'Category name and images are required and images should be an array.' });
        }

        // Create a new category object
        const newCategory = new Category({
            name,
            images,
            subCategories: subCategories || [] // If no subcategories are provided, default to an empty array
        });

        // Save the new category to the database
        const savedCategory = await newCategory.save();

        // Respond with the saved category details
        res.json({ success: true, message: 'Category added successfully', data: savedCategory });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

module.exports =  addCategory ;
