import Order from '../models/orderModel.js';
import asyncHandler from 'express-async-handler';


// private route,post api/orders add new order
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAdress, paymentMethod,
        itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('no order items')
        return
    } else {
        const order = new Order({
            orderItems, user: req.user._id, shippingAdress, paymentMethod,
            itemsPrice, taxPrice, shippingPrice, totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }


})


// private route,get api/orders/:id
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }


})



// private route,update order to paid /api/orders/:id/pay
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address:  req.body.payer.email_address,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

})




// private route,update order to deliverd /api/orders/:id/deliver
const updateOrderToDeliverd = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if (order) {
        order.isDeliverd = true
        order.deliverdAt = Date.now()
      
        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

})


// private route,get orders by user /api/orders/myorders
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user:req.user._id})
        res.json(orders)
 

})

// private/ADMIN ,get all orders /api/orders
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name')
    console.log(orders) 
        res.json(orders)
 

})



export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDeliverd,
    getMyOrders,
    getOrders
}