import styles from "./About.module.css";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";

const About = () => {
  const imagenUno = {
    imageUrl:
      "data:image/jpeg;base64,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",
  };
  const imagenDos = {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgs2V5DePTzIPYOSMozQ4e-3LthWHPcO-x_w&usqp=CAU",
  };
  const imagenTres = {
    imageUrl:
      "data:image/jpeg;base64,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",
  };

  return (
    <Box
      backgroundImage={"https://wallpaperaccess.com/full/1812875.jpg"}
      height={"100vh"}
      minHeight={"100vh"}
      bgSize={"cover"}
      bgRepeat={"no-repeat"}
      paddingTop={"5em"}
    >
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="#EEF2E6"
      >
        <Box
          mt="125px"
          p="50px"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          borderRadius="0.75em"
          boxShadow="9px 13px 13px 3px #1C6758"
          w="1000px"
          bgColor="#3D8361"
          h="780px"
        >
          <Heading
            as="h2"
            fontSize="60px"
            textShadow="1px 1px rgb(0, 0, 0), 1px 1px rgb(13, 5, 25), -3px 0 4px #000000"
            fontFamily="Arial, Helvetica, sans-serif"
            color="#e2edce"
            fontWeight="lighter"
            textAlign="center"
          >
            Vegan World <small>🌿</small>
          </Heading>
          <Text as="h3" ml="100px" w="80%" color="white">
            Comes from our own needs. We wanted an app that could make it easier
            to be a vegan and order food like everybody else. So we teamed up
            and built our own company to facilitate this. And we couldn't be
            happier about the results.
          </Text>
          <Text as="h2" ml="100px" w="80%" color="green.200">
            Day after day more than 3000 orders from our website are being
            completed. And that means that a lot of people are eating healthy
            and delicious food.
          </Text>
          <Flex flexDirection="row" alignItems="center">
            <Image
              src={imagenUno.imageUrl}
              p="6"
              borderRadius="200"
              w="250px"
              h="250px"
              objectFit="cover"
              m="30px"
              boxShadow="0px 0px 15px #7fb69b"
            />
            <Image
              src={imagenDos.imageUrl}
              p="6"
              borderRadius="200"
              w="250px"
              h="250px"
              objectFit="cover"
              m="30px"
              boxShadow="0px 0px 15px #7fb69b"
            />
            <Image
              src={imagenTres.imageUrl}
              p="6"
              borderRadius="200"
              w="250px"
              h="250px"
              objectFit="cover"
              m="30px"
              boxShadow="0px 0px 15px #7fb69b"
            />
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default About;
