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
} from "@chakra-ui/react";
import React from "react";
import { useDisclosure } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
function DrawerMenu() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
        <DrawerContent bg={" rgba(34, 34, 34, 0.8)"} color={"white"}>
          <DrawerCloseButton />
          <DrawerHeader
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
            fontSize={"19px"}
          ></DrawerHeader>

          <DrawerBody textAlign={"center"}>
            <Grid templateRows={"repeat(6,1fr)"} gap={12} marginTop={"8em"}>
              <a href="/MyProfile">
                <Heading
                  fontSize={"30PX"}
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  _hover={{
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  Profile
                </Heading>
              </a>
              <a href="/Favorites">
                <Heading
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  fontSize={"30PX"}
                  _hover={{
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  Favorites
                </Heading>
              </a>
              <a href="/MyOrders">
                <Heading
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  fontSize={"30PX"}
                  _hover={{
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  Orders
                </Heading>
              </a>
              <a href="/MyReviews">
                <Heading
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  fontSize={"30PX"}
                  _hover={{
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  Reviews
                </Heading>
              </a>
              <a href="/ContactUs">
                <Heading
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  fontSize={"30PX"}
                  _hover={{
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  Contact
                </Heading>
              </a>
              <a href="/About">
                <Heading
                  fontSize={"30PX"}
                  _hover={{
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  About us
                </Heading>
              </a>
            </Grid>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerMenu;
