import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productDetailsReducer, productListReducer, productDeleteReducer, productCreateReducer,
  productUpdateReducer, productReviewCreteReducer, productTopRatedReducer
} from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers.js'
import {
  orderCreateReducer, orderDetailsReducer, orderListMyReducer,
  orderPayReducer, orderListReducer, orderDeliverReducer
} from './reducers/orderReducers.js'
import {
  userLoginReducer, userRegisterReducer, userDetailsReducer,
  userUpdateProfileReducer, userListReducer, userDeleteReducer, userUpdateReducer
} from './reducers/userReducers.js'

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productTopRated: productTopRatedReducer,
  productReviewCreate: productReviewCreteReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderDeliver: orderDeliverReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,


})

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null
const shippingAdressFromStorge = localStorage.getItem('shippingAdress')
  ? JSON.parse(localStorage.getItem('shippingAdress'))
  : {
  }

const initialState = {
  cart: { cartItems: cartItemsFromStorage, shippingAdress: shippingAdressFromStorge },
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store;    