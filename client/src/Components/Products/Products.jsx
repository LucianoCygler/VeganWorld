import React from "react";
import styles from "./Products.module.css";
import Product from "./Product/Product";
import AOS from "aos";
import "aos/dist/aos.css";
function Products({ products }) {
  return (
    <div className={styles.mainContainer}>
      {products?.length > 0 &&
        products.map(({ nombre, id, descripcion, stock, precio, imagen }) => {
          return (
            <div
              className={styles.cardContainer}
              key={id}
              data-aos="flip-up"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
              data-aos-duration="500"
            >
              <Product
                id={id}
                nombre={nombre}
                descripcion={descripcion}
                stock={stock}
                precio={precio}
                imagen={imagen}
              />
            </div>
          );
        })}
    </div>
  );
}

export default Products;
