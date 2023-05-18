import styles from "./About.module.css";
import { Box, Image, Flex, Center, Text, Square} from '@chakra-ui/react'

const About = () => {
  const props = {
    imageUrl: 'https://lh3.googleusercontent.com/x38IQRDTmLHdORZdCX6oUOKXrUfGDO5GekvJlUhBi6rMbkej3rp8yQvnaSjoD3p70K8j5Q1QZvXw0fHVWrxjDpRKvKN7Ra6E3l0tlv7U',
  }
  return (
      <Box pt='200'>
      <Flex color='white'>
        <Center w='100px' bg='green'>
          <Text>Box 1</Text>
        </Center>
        <Square bg='blue' size='150px'>
          <Text>Box 2</Text>
        </Square>
        <Box flex='1' bg='tomato'>
          <Text>Box 3</Text>
        </Box>
      </Flex>
      {/* <div className={styles.mainContainer}>
        <div className={styles.contenedor}>
          <h2 className={styles.h2}>Vegan World</h2>
          <h3>Comes from our own needs. We wanted an app that could make it easier to be a vegan and order food like everybody else.
            So we teamed up and built our own company to facilitate this. And we couldn't be happier about the results.</h3>
          <h3>Day after day more than 3000 orders from our website are being completed. And that means that a lot of people are eating healthy and delicious food.</h3>
        </div>
        <Image src={props.imageUrl} p='6' borderRadius='50' />
        <img className={styles.image} src="https://lh3.googleusercontent.com/x38IQRDTmLHdORZdCX6oUOKXrUfGDO5GekvJlUhBi6rMbkej3rp8yQvnaSjoD3p70K8j5Q1QZvXw0fHVWrxjDpRKvKN7Ra6E3l0tlv7U" alt="logo" />
      </div>  */}
      </Box>
  );
};

export default About;
