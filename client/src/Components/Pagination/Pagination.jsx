import { Box, CSSReset } from "@chakra-ui/react";
import React from "react";
import { Global, css } from "@emotion/react";

export default function Pagination({
  goToPrevPage,
  goToNextPage,
  goToPage,
  currentPage,
  lastPage,
}) {
  const buttons = [];

  for (let i = 0; i < lastPage; i++) {
    buttons.push(
      <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
        <a className="page-link" onClick={() => goToPage(i)} href="#">
          {i + 1}
        </a>
      </li>
    );
  }

  return (
    <Box className="pagination-container">
      <Global
        styles={css`
          .pagination-container {
            /* Estilos del contenedor del paginado */
          }

          .page-item.active a.page-link {
            background-color: teal; /* Cambia el color de fondo del elemento seleccionado */
            color: white;
            border-color: teal; /* Cambia el color del texto del elemento seleccionado */
            font-weight: bold;
          }

          .page-item:not(.active) a.page-link {
            /* Estilos de los elementos no seleccionados */
            color: teal; /* Cambia el color del texto de los elementos no seleccionados */
            font-weight: bold;
          }

          .page-item:not(.active) a.page-link:hover {
            /* Estilos de los elementos no seleccionados al pasar el mouse */
            text-decoration: underline; /* Agrega subrayado al pasar el mouse sobre los elementos no seleccionados */
          }

          .page-item.disabled a.page-link {
            /* Estilos del botón "Previous" y "Next" cuando están desactivados */
            pointer-events: none; /* Desactiva los eventos de clic en los botones desactivados */
            color: gray; /* Cambia el color del texto de los botones desactivados */
          }

          .page-item a.page-link:focus {
            outline: none; /* Elimina el efecto de marcado predeterminado */
            box-shadow: none; /* Elimina el sombreado predeterminado */
            border-color: teal; /* Cambia el color del borde al enfocar el botón */
          }
        `}
      />
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
            <a className="page-link" onClick={goToPrevPage} href="#">
              {"<"}
            </a>
          </li>
          {buttons}
          <li
            className={`page-item ${
              currentPage === lastPage - 1 ? "disabled" : ""
            }`}
          >
            <a className="page-link" onClick={goToNextPage} href="#">
              {">"}
            </a>
          </li>
        </ul>
      </nav>
    </Box>
  );
}
