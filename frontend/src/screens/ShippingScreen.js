import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAdress } from '../actions/cartActions';



const ShippingScreen = ({ history }) => {
     const cart= useSelector(state=>state.cart)
     const{shippingAdress}=cart
     const dispatch= useDispatch()

    const [adress, setAdress] = useState(shippingAdress.adress)
    const [city, setCity] = useState(shippingAdress.city)
    const [postalCode, setPostalCode] = useState(shippingAdress.postalCode)
    const [country, setCountry] = useState(shippingAdress.country)

 
    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(saveShippingAdress({adress,city,postalCode,country}))
        console.log({adress,city,postalCode,country})
        history.push('/payment')
      }

    return (
        <FormContainer>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='adress'>
                    <Form.Label>Adress</Form.Label>
                    <Form.Control type='text' required placeholder='Enter adress'
                        value={adress} onChange={e => setAdress(e.target.value)}>
                    </Form.Control>
                </Form.Group>
   
                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter city'
                        value={city} onChange={e => setCity(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter postal code'
                        value={postalCode} onChange={e => setPostalCode(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Enter country'
                        value={country} onChange={e => setCountry(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
