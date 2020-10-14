import Product from '../models/productModel.js';
import asyncHandler from 'express-async-handler';


// public route, fetching all the products get /
const getProducts = asyncHandler(async (req, res) => {

  const keyword= req.query.keyword ? {
    name:{
      $regex:req.query.keyword,
      $options: 'i'
    }
  } :{}

  const products = await Product.find({...keyword})


  res.json(products)
})

//public route, fetching product by id get /:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})


//private/ADMIN, delete product by id delete /:id
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'procuct removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})



//private/ADMIN, create product post /
const createProduct = asyncHandler(async (req, res) => {
  const product= new Product({
    name:'Sample Name',
    price:0,
    user:req.user._id,
    image:'/images/sample.jpg',
    category:'Sample Category',
    brand:'Sample brand',
    countInStock:0,
    numReviews:0,
    description:'Sample description'
  })

  const createdProduct  = await product.save()
  res.status(201).json(createdProduct)
})

//private/ADMIN, update product put /:id
const updateProduct = asyncHandler(async (req, res) => {
  const {name, price,description,image,brand,category,countInStock} =req.body

  const product = await Product.findById(req.params.id)

  if(product){
    product.name=name
    product.price=price
    product.description=description
    product.image=image
    product.brand=brand
    product.category=category 
    product.countInStock=countInStock
 

    const updatedProduct  = await product.save()
    res.status(201).json(updatedProduct)
  }else{
    res.status(404)
    throw new Error('Product not found')
  }


})


//private, create new review post /api/products/:id/reviews
const createProductReview = asyncHandler(async (req, res) => {
  const {rating, comment} =req.body

  const product = await Product.findById(req.params.id)
  if(product){
    const alreadyReviewd = product.reviews.find(r=>r.user.toString()=== req.user._id.toString())
    
if(alreadyReviewd){
  res.status(400)
  throw new Error('product already reviewed')
}
 const review ={
   name:req.user.name,
   rating:rating, 
   comment,
   user:req.user._id
 } 

  product.reviews.push(review) 
  product.numReviews=product.reviews.length
  product.rating=product.reviews.reduce((acc,item)=>item.rating+acc,0)/ product.reviews.length

   await product.save()
    res.status(201).json({message:'review added'})
  }else{
    res.status(404)
    throw new Error('Product not found') 
  }


})


export {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview
}   