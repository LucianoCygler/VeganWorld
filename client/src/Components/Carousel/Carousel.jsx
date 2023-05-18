import React from 'react';
import { Box, Flex, Button, Slide } from '@chakra-ui/react';
import styles from "./Carousel.module.css";
import { motion } from 'framer-motion';

const products = [
    { id: 1, name: 'Producto 1', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 2, name: 'Producto 2', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 3, name: 'Producto 3', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 4, name: 'Producto 4', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 5, name: 'Producto 5', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 6, name: 'Producto 6', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 7, name: 'Producto 7', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 8, name: 'Producto 8', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 9, name: 'Producto 9', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 10, name: 'Producto 10', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 11, name: 'Producto 11', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },
    { id: 12, name: 'Producto 12', image: 'https://res.cloudinary.com/dzv1xau8l/image/upload/v1684421289/imagenes/ihlsklhxsvlmjj0astpj.jpg' },

];

const Carousel = () => {

    const [currentIndex, setCurrentIndex] = React.useState(0);


    const productsPerPage = 6;


    const totalSlides = Math.ceil(products.length / productsPerPage);

    const currentProducts = products.slice(
        currentIndex * productsPerPage,
        (currentIndex + 1) * productsPerPage
    );

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
    };

    const AnimatedBox = motion(Box);
    return (

        <AnimatedBox animate={{ x: 100}}>
            <Box>
                <Flex justifyContent="center" alignItems="center">
                    <Button className={styles.button} mr={2} onClick={handlePrev} p="20px">
                        ←
                    </Button>
                    {currentProducts.map((product) => (
                        <Box key={product.id} p={4} borderWidth="1px" borderRadius="md" m={2}>
                            <img src={product.image} alt={product.name} />
                            <h3>{product.name}</h3>
                        </Box>
                    ))}
                    <Button className={styles.button} ml={2} onClick={handleNext} p="20px">
                        →
                    </Button>
                </Flex>
            </Box>
        </AnimatedBox>

    )
};

export default Carousel;
