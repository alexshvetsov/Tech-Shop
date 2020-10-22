import React from 'react';
import {Route} from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';

import {
    Navbar, Nav, Container, NavDropdown,
} from 'react-bootstrap'

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin
    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }
    return (
        <header> 
            <Navbar bg="dark" variant="dark" collapseOnSelect expand="lg">
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand >Shvetsov-Shop</Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                         <Route render={({history})=><SearchBox history={history}/>}/>
                        <Nav className="ml-auto">
                            <LinkContainer to='/cart'>
                                <Nav.Link ><i className='fas fa-shopping-cart'></i> cart</Nav.Link>
                            </LinkContainer>
                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item>Profile</NavDropdown.Item>
                                    </LinkContainer>
                                    <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>

                                </NavDropdown>
                            ) : <LinkContainer to='/login'>
                                    <Nav.Link ><i className='fas fa-user pr-2'></i>Sign in</Nav.Link>
                                </LinkContainer>}

                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adaminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )
                                }
                        </Nav>

                    </Navbar.Collapse>
                </Container>

            </Navbar >
        </header >
    )
}

export default Header
