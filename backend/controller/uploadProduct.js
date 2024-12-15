const productModel = require('../models/productModel');

async function uploadProduct(req, res) {
    try {
        // Log the incoming request body
        console.log("Incoming request body:", req.body);

        // Destructure the data from the request body
        const { productName, brandName, categoryId, subcategoryId, productImage, description, price, quantityOptions } = req.body;

        // Validation checks to ensure all required fields are provided
        if (!productName) {
            return res.status(400).json({ message: 'Product name is required.', success: false });
        }
        if (!categoryId) {
            return res.status(400).json({ message: 'Category ID is required.', success: false });
        }
        if (!productImage) {
            return res.status(400).json({ message: 'Product image is required.', success: false });
        }
        if (!price) {
            return res.status(400).json({ message: 'Price is required.', success: false });
        }
        if (!quantityOptions || quantityOptions.length === 0) {
            return res.status(400).json({ message: 'Quantity options are required and must be an array with at least one option.', success: false });
        }

        // Validate quantityOptions (it should be a non-empty array with objects containing quantity and price)
        for (let option of quantityOptions) {
            if (!option.quantity || !option.price) {
                return res.status(400).json({ message: 'Each quantity option must include both quantity and price.', success: false });
            }
        }

        // Create a new product instance based on the schema
        const newProduct = new productModel({
            productName,
            brandName, // brandName is optional
            categoryId,
            subcategoryId, // This can be null, as it's optional
            productImage,
            description, // description is optional
            price, // Base price
            quantityOptions // Array of quantity options
        });

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Return success response with the saved product data
        res.status(201).json({ message: 'Product uploaded successfully', success: true, data: savedProduct });
    } catch (error) {
        console.error("Error uploading product:", error); // Log the error for debugging purposes
        res.status(500).json({ message: error.message, success: false });
    }
}

module.exports = uploadProduct;
