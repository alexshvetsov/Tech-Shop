import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';


// public route, fetching all the products
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

//public route, fetching product by id 
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
    getProductById,
    getProducts
}   