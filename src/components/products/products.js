import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useGetAllProductsQuery } from '../../services/productApi';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux/es/exports';
import { addToCart } from '../../features/cartFreatures/cartSlice';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


const Products = ({ show }) => {
    const count = show == undefined ? 20 : 6;
    const { data, isFetching } = useGetAllProductsQuery(count);
    console.log(data);

    const dispatch = useDispatch();
    if (isFetching) return (
        <Box sx={{ display: 'flex',alignItems:'center',justifyContent:'center'}}>
          <CircularProgress />
        </Box>
      );
      
    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    return (
        <>
            <Container>
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
            </Container>
        </>
    )
}

export default Products;