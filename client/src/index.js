import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
<<<<<<< HEAD
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { ChakraProvider } from '@chakra-ui/react';
=======
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

const root = ReactDOM.createRoot(document.getElementById("root"));
>>>>>>> 3f140969ffa1ca40b25548ba26fa61d4a7aa1e12

root.render(
<<<<<<< HEAD
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
=======
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>
>>>>>>> 3f140969ffa1ca40b25548ba26fa61d4a7aa1e12
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
