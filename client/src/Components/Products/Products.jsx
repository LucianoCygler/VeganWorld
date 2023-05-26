import React from "react";
import Product from "./Product/Product";
import { Box, Flex, Grid } from "@chakra-ui/react";
function Products({ products }) {
  return (
    <Box>
      <Grid
        templateColumns={{
          base: "1fr",
          sm: "repeat(1,300px)",
          md: "repeat(2,300px)",
          lg: "repeat(3,300px)",
          xl: "repeat(4,300px)",
          "2xl": "repeat(6, 1fr)",
        }}
      >
        {products?.length > 0 &&
          products.map(({ nombre, id, descripcion, stock, precio, imagen }) => {
            return (
              <Box
                borderRadius={"5px"}
                bg="#d8d8d8"
                w={"200px"}
                h="22em"
                maxW={"200px"}
                maxH="22em"
                marginBottom={"3em"}
                paddingTop={"2em"}
              >
                {" "}
                <Product
                  id={id}
                  nombre={nombre}
                  descripcion={descripcion}
                  stock={stock}
                  precio={precio}
                  imagen={imagen}
                />
              </Box>
            );
          })}
      </Grid>
    </Box>
  );
}

export default Products;
