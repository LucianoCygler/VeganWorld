import { Box, Heading, Text, Image } from '@chakra-ui/react'
import React from 'react'

function NotFound() {
  return (    
    <Box display={"flex"} textAlign="center" justifyContent={"center"}  pt={"15em"}  minHeight="100vh" bgColor="#C6BA9F">
        <Box display={"flex"} flexDirection={"column"} textAlign="center" justifyContent={"center"} width={"60em"} mb={"20em"}>
      <Heading as="h1" size={"4xl"} mb={6} color={"white"} textShadow={"7px 3px 3px rgba(45,45,45,0.65)"}>
        404 - Page not found
      </Heading>
      <Text fontSize={"2xl"} color="gray.800"   >
      We're sorry, the page you're looking for does not exist.
      </Text>
      <Image  borderRadius={"100%"} minWidth={"20em"} height={"20em"} m={"1em 15em"} src='https://res.cloudinary.com/da6d9ru3s/image/upload/v1685374801/nft_uxeawz.gif'>

      </Image>
      </Box>
    </Box>
    
  )
}

export default NotFound