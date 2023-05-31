import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Input,
  Grid,
  Heading,
  Text,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { NavLink, useLocation } from "react-router-dom";

function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelected = (event) => {
    setSelectedOption(event.target.name);
  };

  const userON = localStorage.getItem("email");
  return (
    <>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent
          bg={" rgba(34, 34, 34, 0.8)"}
          color={"white"}
          minHeight={"100vh"}
        >
          <DrawerCloseButton />
          <DrawerHeader
            bg={"  rgba(12, 92, 99, 0.5)"}
            textShadow="2px 2px 114px rgba(0, 0, 0, 0.9)"
            fontSize={"25px"}
            fontWeight={"bold"}
          >
            <Text
              fontWeight={"semibold"}
              display={"inline"}
              color={"lightseagreen"}
              marginRight={-2}
            >
              {" "}
              Vegan
            </Text>{" "}
            <Text display="inline">World!</Text>
          </DrawerHeader>

          <DrawerBody textAlign={"left"}>
            {userON ? (
              <Grid templateRows={"repeat(6,1fr)"} gap={10} marginTop={"3em"}>
                <NavLink to="/MyProfile">
                  <Heading
                    name="profile"
                    color={selectedOption === "profile" ? "teal" : "white"}
                    fontWeight={"light"}
                    fontSize={"25PX"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                    _hover={{
                      color: "#22FF2C",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      textShadow: "1px 2px 11px #EEEEEE",
                      cursor: "pointer",
                    }}
                    onClick={handleSelected}
                  >
                    Profile
                  </Heading>
                </NavLink>{" "}
                <NavLink to="/Favorites">
                  <Heading
                    name="favorites"
                    fontWeight={"light"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                    fontSize={"25PX"}
                    _hover={{
                      color: "#22FF2C",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      textShadow: "1px 2px 11px #EEEEEE",
                      cursor: "pointer",
                    }}
                    onClick={handleSelected}
                  >
                    Favorites
                  </Heading>
                </NavLink>
                <NavLink to="/MyOrders">
                  <Heading
                    name="orders"
                    fontWeight={"light"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                    fontSize={"25PX"}
                    _hover={{
                      color: "#22FF2C",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      textShadow: "1px 2px 11px #EEEEEE",
                      cursor: "pointer",
                    }}
                    onClick={handleSelected}
                  >
                    Orders
                  </Heading>
                </NavLink>
                <NavLink to="/MyReviews">
                  <Heading
                    name="reviews"
                    fontWeight={"light"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                    fontSize={"25PX"}
                    _hover={{
                      color: "#22FF2C",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      textShadow: "1px 2px 11px #EEEEEE",
                      cursor: "pointer",
                    }}
                    onClick={handleSelected}
                  >
                    Reviews
                  </Heading>
                </NavLink>{" "}
                <NavLink to="/PageReview">
                  <Heading
                    name="pageReview"
                    color={selectedOption === "pageReview" ? "teal" : "white"}
                    fontWeight={"light"}
                    fontSize={"25PX"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                    _hover={{
                      color: "#22FF2C",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      textShadow: "1px 2px 11px #EEEEEE",
                      cursor: "pointer",
                    }}
                    onClick={handleSelected}
                  >
                    My page review
                  </Heading>
                </NavLink>{" "}
                <NavLink to="/OurProducts">
                  <Heading
                    name="products"
                    color={"yellow.400"}
                    fontWeight={"light"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                    fontSize={"25PX"}
                    _hover={{
                      color: "yellow",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      textShadow: "1px 2px 11px #EEEEEE",
                      cursor: "pointer",
                    }}
                    onClick={handleSelected}
                  >
                    Our Products
                  </Heading>
                </NavLink>
              </Grid>
            ) : (
              <Box mt="3em">
                {" "}
                <NavLink to="/OurProducts">
                  <Heading
                    name="products"
                    color={"yellow.400"}
                    fontWeight={"light"}
                    textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                    fontSize={"25PX"}
                    _hover={{
                      color: "yellow",
                      transition: "color 0.3s ease, text-shadow 0.3s ease",
                      textShadow: "1px 2px 11px #EEEEEE",
                      cursor: "pointer",
                    }}
                    onClick={handleSelected}
                  >
                    Our Products
                  </Heading>
                </NavLink>
              </Box>
            )}
          </DrawerBody>
          <hr></hr>
          <DrawerFooter justifyContent={"left"}>
            <a href="/ContactUs">
              <Heading
                id="contact"
                marginRight={"11em"}
                fontWeight={"light"}
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                fontSize={"15px"}
                _hover={{
                  color: "#22FF2C",
                  transition: "color 0.3s ease, text-shadow 0.3s ease",
                  textShadow: "1px 2px 11px #EEEEEE",
                  cursor: "pointer",
                }}
                onClick={handleSelected}
              >
                Contact
              </Heading>
            </a>
            <a href="/About">
              <Heading
                id="about"
                fontWeight={"light"}
                fontSize={"15PX"}
                _hover={{
                  color: "#22FF2C",
                  transition: "color 0.3s ease, text-shadow 0.3s ease",
                  textShadow: "1px 2px 11px #EEEEEE",
                  cursor: "pointer",
                }}
                onClick={handleSelected}
              >
                About us
              </Heading>
            </a>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerMenu;
