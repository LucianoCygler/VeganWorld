import React, { useEffect, useState } from "react";
import { Ring } from "@uiball/loaders";
import styles from "./Detail.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductById,
  cleanDetail,
  addCartProduct,
  getProductReviews,
} from "../../redux/actions/actions";
import Pop_up from "../../Utils/Pop_up/Pop_up";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product] = useSelector((state) => state.product);
  const productReviews = useSelector((state) => state.productReviews);

  const [quantity, setQuantity] = useState(1);
  const product_id = id;

  useEffect(() => {
    dispatch(getProductById(id));
    return () => dispatch(cleanDetail());
  }, [dispatch, id]);
  useEffect(() => {
    if (product_id) {
      dispatch(getProductReviews(product_id));
    }
  }, [product_id]);

  const handleClick = () => {
    try {
      dispatch(addCartProduct(product, quantity));
      Pop_up("success", "Product added", "You can find your products in Cart!");
    } catch ({ message }) {
      Pop_up("info", "Product added", message);
    }
  };

  const handleDecrement = () => {
    setQuantity(quantity > 1 ? quantity - 1 : 1);
  };

  const handleIncrement = () => {
    if (quantity < 100) {
      setQuantity(quantity + 1);
    }
  };
  const handleGoBack = () => {
    navigate(-1);
  };
  return (

    <Box minWidth="100%" minHeight="100vh" bg="white" paddingTop="10em">
      {product?.nombre ? (
        <>
          <Box bg="white">
            <Grid
              bg="white"
              margin="auto"
              height="80vh"
              position="relative"
              templateRows="repeat(2, 0.1fr)"
              justify="center"
              align="center"
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.2)"
              maxWidth="80%"
            >
              <Box marginTop="2em">
                {" "}
                <h1>{product.nombre}</h1>
              </Box>
              <Flex
                direction="row"
                margin="auto"
                bg="white"
                justify="center"
                align="center"
                paddingBottom="4em"
                maxWidth="fit-content"

                // Configuración de la sombra
              >
                <Button
                  colorScheme="teal"
                  size="xs"
                  onClick={handleGoBack}
                  position="absolute"
                  left="10px"
                  top="10px"
                  zIndex="1"
                >
                  <FontAwesomeIcon icon={faArrowLeftLong} />
                </Button>
                <Box
                  minWidth="500px"
                  minheigth="500px"
                  bg="white"
                  margin="3em"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Img
                    src={product.imagen}
                    alt={product.nombre}
                    borderRadius="full"
                    shadow="0px 4px 10px rgba(0, 0, 0, 0.2)"
                    width="100%"
                  />
                </Box>
                <Box
                  marginTop="5em"
                  marginLeft="4em"
                  bg="white"
                  marginRight="2em"
                >
                  {" "}
                  <Grid
                    gridTemplateRows="3"
                    gap="20"
                    paddingTop="8em"
                    minWidth="500px"
                    minheigth="500px"
                  >
                    <p>
                      {product.descripcion}Lorem ipsum dolor sit amet,
                      consectetur adipiscing elit. Donec vel egestas dolor, nec
                      dignissim metus. Donec augue elit, rhoncus ac sodales id,
                      porttitor vitae est. Donec laoreet rutrum libero sed
                      pharetra. Donec vel egestas dolor, nec dignissim metus.
                      Donec augue elit, rhoncus ac sodales id, porttitor vitae
                      est. Donec laoreet rutrum libero sed pharetra. Duis a arcu
                      convallis, gravida purus eget, mollis diam.
                    </p>

                    <h1>${product.precio}</h1>
                    <p>Cantidad: {quantity}</p>
                  </Grid>
                  <Button onClick={handleDecrement}>-</Button>
                  <Button onClick={handleIncrement}>+</Button>
                  <Button
                    isLoading={loading}
                    colorScheme="teal"
                    onClick={handleClick}
                  >
                    Add To Cart
                  </Button>
                </Box>
              </Flex>
            </Grid>
          </Box>
        </>
      ) : (
        <Ring
          size={200}
          lineWeight={5}
          speed={2}
          color="rgba(29, 103, 88, 0.6)"
        />
      )}
      <Box>
        {productReviews
          ? productReviews.slice(0, 3).map((review) => {
              return (
                <>
                  <h1>{review.titulo}</h1>
                  <span>{review.cliente_nombre}</span>
                  <p>{review.descripcion}</p>
                  <p>{review.fecha}</p>
                </>
              );
            })
          : ""}
      </Box>
    </Box>

  );
}
export default Detail;
