import express from 'express';
import AsyncHandler from 'express-async-handler';
const router = express.Router();
import Product from '../models/productModel.js';


// public route, fetching all the products
router.get('/', AsyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
}))


//public route, fetching product by id
router.get('/:id', AsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})) 



export default router