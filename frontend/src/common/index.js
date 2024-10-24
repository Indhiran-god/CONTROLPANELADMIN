const backendDomin = REACT_APP_BACKEND_URL

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: 'get'
    },
    update_user: {
        url: `${backendDomin}/api/update-user`,
        method: 'put'
    },
    productDetails: {
        url: `${backendDomin}/api/product-details`,
        method: 'post'
    },
    allUser: {
        url: `${backendDomin}/api/all-user`,
        method: 'get'
    },
    updateUser: {
        url: `${backendDomin}/api/update-user`,
        method: "post"
    },
    uploadProduct: {
        url: `${backendDomin}/api/upload-product`,
        method: "post"
    },
    updateProduct: {
        url: `${backendDomin}/api/update-product`,
        method: 'PUT'
    },
    allProduct: {
        url: `${backendDomin}/api/get-product`,
        method: 'get'
    },
    Category: {
        url: `${backendDomin}/api/Category`,
        method: 'get'
    },
    deleteProduct: (productId) => ({
        url: `${backendDomin}/api/delete-product/${productId}`,
        method: 'delete'
    }),
    deleteSubcategory: (subcategoryId) => ({
        url: `${backendDomin}/api/delete-subcategory/${subcategoryId}`,
        method: 'DELETE'
    }),
    
    getSubcategories: (categoryName) => ({
        url: `${backendDomin}/api/category/${categoryName}/subcategories`,
        method: 'get'
    }),
    getAllSubcategories: {
        url: `${backendDomin}/api/subcategories`,
        method: 'get'
    },
    addSubcategory: {
        url: `${backendDomin}/api/add-subcategories/:categoryId`,
        method: 'POST',
    },
};

export default SummaryApi;
