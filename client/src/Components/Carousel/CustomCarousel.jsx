import React, { useEffect } from "react";
import { Box, Flex, Button, Image, useMediaQuery } from "@chakra-ui/react";
import "./Carousel.module.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./Carousel.module.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../redux/actions/actions";
import { NavLink } from "react-router-dom";

// const products = [
//   {
//     id: 1,
//     name: "Desayuno completo",
//     image:
//       "https://cdn.urbantecno.com/urbantecno/2022/10/Estas-aplicaciones-te-permitiran-acceder-a-un-catalogo-de-miles-de-recetas-con-platillos-vegetarianos.jpg",
//   },
//   {
//     id: 2,
//     name: "Light-Green Salad",
//     image:
//       "https://img.freepik.com/foto-gratis/ensalada-tomate-pepino-cebolla-morada-hojas-lechuga-menu-saludable-vitaminas-verano-comida-vegetariana-vegana-mesa-cena-vegetariana-vista-superior-lay-flat_2829-6482.jpg",
//   },
//   {
//     id: 3,
//     name: "Bocaditos de falafel",
//     image:
//       "https://img-global.cpcdn.com/recipes/7651a1de84212ee0/680x482cq70/falafel-foto-principal.jpg",
//   },
//   {
//     id: 4,
//     name: "Arroz vegano",
//     image: "https://i.blogs.es/e78f73/recetas-vegans/1366_2000.jpg",
//   },
//   {
//     id: 5,
//     name: "Tostadas Veganas",
//     image:
//       "https://images11.eitb.eus/multimedia/images/2019/04/04/2420793/20190404161404_vegano_foto610x342.jpg",
//   },
//   {
//     id: 6,
//     name: "Ensalada Anashe",
//     image:
//       "https://www.lavanguardia.com/files/og_thumbnail/uploads/2020/01/27/5fa8fc09e020a.png",
//   },
//   {
//     id: 7,
//     name: "Ratatouille",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIzWQdbbtTRdbNgxvu1a98MFjNsRC0PaQ3ojXo_ELUvtWO4cifRoM3O-r6MQXeCQMMRVc&usqp=CAU",
//   },
//   {
//     id: 8,
//     name: "Plato Gourmet",
//     image:
//       "https://gastronomiaycia.republica.com/wp-content/uploads/2020/03/sal_comida_vegana.jpg",
//   },
//   {
//     id: 9,
//     name: "Boloñesa de Soja Texturizada",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQriPI_fbPVZpX_68uXtbqyePXpoQ-eynoceA&usqp=CAU",
//   },
//   {
//     id: 10,
//     name: "El plato de masterchef",
//     image:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROoPm5aZPqcPl_DTmFGHrLtedOXKrWjNNsqA&usqp=CAU",
//   },
//   {
//     id: 11,
//     name: "Wrap de Falafel",
//     image: "https://static.toiimg.com/thumb/62708678.cms?width=1200&height=900",
//   },
//   {
//     id: 12,
//     name: "Hamburguesa Vegana",
//     image:
//       "https://i0.wp.com/veganista.es/wp-content/uploads/2018/04/IMG_20180424_141630.jpg?resize=624%2C509",
//   },
// ];

const chunkArray = (arr, chunkSize) => {
  let result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    result.push(arr.slice(i, i + chunkSize));
  }
  return result;
};

const CustomCarousel = () => {
  const [isSmallerThanBase] = useMediaQuery("(max-width: 35em)");
  const [isSmallerThanSd] = useMediaQuery("(max-width: 35em)");
  const [isSmallerThanMd] = useMediaQuery("(max-width: 46em)");
  const [isSmallerThanLg] = useMediaQuery("(max-width: 55em)");
  const [isSmallerThanXl] = useMediaQuery("(max-width: 80em)");
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  let productsPerPage = 6;

  if (isSmallerThanBase) {
    productsPerPage = 1;
  } else if (isSmallerThanSd) {
    productsPerPage = 1;
  } else if (isSmallerThanMd) {
    productsPerPage = 4;
  } else if (isSmallerThanLg) {
    productsPerPage = 5;
  } else if (isSmallerThanXl) {
    productsPerPage = 6;
  }

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);
  const groupedProducts = chunkArray(products, productsPerPage);

  return (
    <Box
      className={styles.carouselContainer}
      zIndex={1}
      marginTop={10}
      data-aos="fade-right"
      data-aos-offset="300"
      data-aos-easing="ease-in-sine"
    >
      <Flex
        justifyContent="center"
        alignItems="center"
        className={styles.carouselItems}
      >
        <Carousel
          className={styles.carouselControlArrow}
          showArrows
          showThumbs={false}
          showStatus={false}
          swipeable
          infiniteLoop
        >
          {groupedProducts.map((group, index) => (
            <Flex
              key={index}
              wrap="wrap"
              display={"flex"}
              justifyContent={"center"}
            >
              {group.map((product) => (
                <Box
                  key={product.id}
                  minW={"190px"}
                  p={4}
                  borderRadius="md"
                  className={styles.productCard}
                >
                  <NavLink
                    to={`/Detail/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box>
                      {" "}
                      <Image
                        borderRadius={"12%"}
                        marginTop={"2em"}
                        h={"190px"}
                        w={"60px"}
                        src={product.imagen}
                        alt={product.name}
                      />
                    </Box>
                  </NavLink>
                  <NavLink
                    to={`/Detail/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box>
                      {" "}
                      <h3 className={styles.productName}>{product.nombre}</h3>
                    </Box>{" "}
                  </NavLink>
                </Box>
              ))}
            </Flex>
          ))}
        </Carousel>
      </Flex>
    </Box>
  );
};

export default CustomCarousel;
