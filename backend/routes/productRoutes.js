import express from 'express';
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js'


// public route, fetching all the products
router.route('/').get(getProducts)


//public route, fetching product by id
router.route('/:id').get(getProductById)



export default router