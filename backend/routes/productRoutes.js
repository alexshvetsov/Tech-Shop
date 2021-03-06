import express from 'express';
const router = express.Router();
import { getProductById, getProducts, deleteProduct,createProduct, updateProduct,createProductReview,getTopProducts } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';



// public route, fetching all the products
router.route('/')
.get(getProducts)
.post(protect,admin,createProduct)

router.get('/top',getTopProducts)

router.route('/:id') 
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect,admin,updateProduct)

    router.route('/:id/reviews').post(protect,createProductReview )
 
export default router