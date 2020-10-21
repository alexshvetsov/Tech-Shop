import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import {Route} from 'react-router-dom' 
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProductCarousel from '../components/ProductCarousel';
import ProductsList from '../components/ProductsList';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';
import { listProducts } from '../actions/productActions';



const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword
    // const pageNumber = match.params.pageNumber || 1

    // const dispatch = useDispatch()
    // const productList = useSelector(state => state.productList);
    // const { loading, error, products, pages, page } = productList


    // useEffect(() => {
    //     dispatch(listProducts(keyword, pageNumber))
    // }, [dispatch, keyword, pageNumber])



    return (
        <>
            <Meta />
            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light'>Go Back</Link>}
            <h1>Latest Products</h1>
 
            <Route to='#' render={({history, match})=><ProductsList match={match} history={history}/>}/>

        </>
    ) 
}

export default HomeScreen
