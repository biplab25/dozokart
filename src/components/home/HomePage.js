import React from 'react'
import { Carousel, Button, Card } from 'react-bootstrap';
import { useGetAllProductsQuery } from '../../services/productApi';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Products from '../products/products';
import { Link } from "react-router-dom";

const HomePage = () => {

    const { data } = useGetAllProductsQuery();
    console.log(data);

    return (
        <>

            {/* Slider components */}
            {/* <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://img.freepik.com/premium-photo/online-shopping-mobile-phone_172660-107.jpg?w=900"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://img.freepik.com/free-vector/black-friday-sale-with-realistic-3d-paper-page_1361-3675.jpg?w=826&t=st=1660454557~exp=1660455157~hmac=b2fce775b4306f86e40f4d88a2c08678e494220d6a3caddc0a00a2520739f0ef"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="https://img.freepik.com/free-vector/black-friday-super-sale-banner-horizontal-with-3d-business-squares-background_1361-3689.jpg?w=826&t=st=1660454591~exp=1660455191~hmac=09c0e354b1229fb4dc73c7a0232d09f8be4b22da27877188547169ac25153b78"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
            {/* Limited products components */}
            <Container>
                <h2>Latest Products</h2>
                <Products show={true}/>
                <Link to="/allproducts">
                <Button variant="warning">Show More</Button>
                </Link>
            </Container>

        </>
    )
}

export default HomePage