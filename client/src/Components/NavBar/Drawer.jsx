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
            bg={"  rgba(12, 92, 99, 0.5)"}
            textShadow="2px 2px 114px rgba(0, 0, 0, 0.9)"
            fontSize={"25px"}
            fontWeight={"bold"}
          >
            <Text display={"inline"} color={"#26a353"}>
              {" "}
              Vegan
            </Text>
            World
          </DrawerHeader>

          <DrawerBody textAlign={"left"}>
            <Grid templateRows={"repeat(6,1fr)"} gap={20} marginTop={"8em"}>
              <a href="/MyProfile">
                <Heading
                  fontWeight={"light"}
                  fontSize={"25PX"}
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
                  fontWeight={"light"}
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  fontSize={"25PX"}
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
                  fontWeight={"light"}
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  fontSize={"25PX"}
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
                  fontWeight={"light"}
                  textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                  fontSize={"25PX"}
                  _hover={{
                    textShadow: "1px 2px 11px #EEEEEE",
                    cursor: "pointer",
                  }}
                >
                  Reviews
                </Heading>
              </a>
            </Grid>
          </DrawerBody>
          <hr></hr>
          <DrawerFooter justifyContent={"left"}>
            <a href="/ContactUs">
              <Heading
                marginRight={"11em"}
                fontWeight={"light"}
                textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)"
                fontSize={"15px"}
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
                fontWeight={"light"}
                fontSize={"15PX"}
                _hover={{
                  textShadow: "1px 2px 11px #EEEEEE",
                  cursor: "pointer",
                }}
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
