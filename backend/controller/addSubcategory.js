const Category = require('../models/Category'); // Adjust the path based on your file structure

const addSubcategory = async (req, res) => {
    try {
        const { categoryName, name, images } = req.body; // Get category and subcategory details from the request body

        // Validate input
        if (!name || !categoryName || !images || images.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required, including at least one image.',
            });
        }

        // Find the category and update the subcategories array
        const category = await Category.findOneAndUpdate(
            { name: categoryName },
            {
                $push: {
                    subCategories: {
                        name,
                        images,
                    },
                },
            },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: 'Category not found.',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Subcategory added successfully.',
            data: category.subCategories, // Send the updated subcategories list
        });
    } catch (error) {
        console.error('Error adding subcategory:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error. Please try again later.',
        });
    }
};

module.exports = addSubcategory;
