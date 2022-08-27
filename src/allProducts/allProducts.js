import React, { useState } from 'react'
import { useGetAllProductsAsCategoryQuery } from '../services/productApi'
import { Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux/es/exports';
import { addToCart } from '../features/cartFreatures/cartSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const AllProducts = () => {
    const [category, setCategory] = useState('jewelery');

    const { data, isFetching } = useGetAllProductsAsCategoryQuery(category);
    console.log(data);

    const dispatch = useDispatch();
    if (isFetching) return (
        <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'center' }}>
            <CircularProgress />
        </Box>
    );

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    return (
        <>
            <div className='allproducts'>
                <div className='buttonCategory'>
                    <Button onClick={() => setCategory("men's clothing")} variant="dark">Men's clothing</Button>
                    <Button onClick={() => setCategory("women's clothing")} variant="dark">Women's clothing</Button>
                    <Button onClick={() => setCategory('jewelery')} variant="dark">Jewelery</Button>
                    <Button onClick={() => setCategory('electronics')} variant="dark">Electronics</Button>
                </div>
                <div className='showProducts'>
                    <div className='productList'>
                        {data?.map((product) => {
                            return (

                                <Card className='product-card' style={{ width: '18rem' }} key={product.id}>
                                    <Card.Img className='product-image' variant="top" src={product.image} />
                                    <Card.Body>
                                        <Card.Title>{product.title.substring(0, 20)}...</Card.Title>
                                        <Card.Text>
                                            {product.description.substring(0, 70)}...
                                        </Card.Text>
                                        <Button onClick={() => handleAddToCart(product)} variant="primary">Add To Cart</Button>
                                    </Card.Body>
                                </Card>

                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}
