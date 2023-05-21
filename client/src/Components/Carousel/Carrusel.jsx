import React from "react";
import { Box, Flex, Button } from "@chakra-ui/react";
import "./Carousel.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Carrusel.module.css";

const promos = [
  {
    id: 1,
    name: "100% NATURAL!",
    image:
      "https://scontent.faep8-2.fna.fbcdn.net/v/t1.6435-9/107841645_2989342897810800_6302349365878077002_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2c4854&_nc_ohc=m5Dn7zVsRgUAX_fZBIt&_nc_ht=scontent.faep8-2.fna&oh=00_AfA9CsHWwbvWvDcahl6_MseXIp5cimxK4ZxONw5X7z8HPQ&oe=648F9CC4",
  },
  {
    id: 2,
    name: "MARTES DE ENSALADA♥",
    image:
      "https://www.escuelainterval.com.ar/xframework/files/entities/cursos/44/44.jpg",
  },
  {
    id: 3,
    name: "Promo Burga Vegana",
    image:
      "https://scontent.faep8-1.fna.fbcdn.net/v/t39.30808-6/309339826_819790042710437_4757810175552025690_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=8bfeb9&_nc_ohc=e-iTQSlgq9EAX8AdFdq&_nc_ht=scontent.faep8-1.fna&oh=00_AfBzpf4Jx-H3FpRZpiF7bJF6q-HGg30j9FaMQYQ2dbX9zQ&oe=646C4FAC",
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
    slidesToSlide: 6, // opcional, por defecto es 1
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
    slidesToSlide: 3, // opcional, por defecto es 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // opcional, por defecto es 1
  },
};

const Carrusel = () => {
  return (
    <Carousel
      responsive={responsive}
      swipeable
      showDots={false}
      infiniteLoop
      autoPlay
      autoPlaySpeed={400}
      keyBoardControl
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {promos.map((product) => (
        <Box
          key={product.id}
          p={4}
          borderWidth="1px"
          borderRadius="md"
          w="480px"
          margin={"auto"}
          color="white"
          textShadow="2px 2px 4px rgba(0, 0, 0, 0.4)"
        >
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
        </Box>
      ))}
    </Carousel>
  );
};

export default Carrusel;
