import {
    Box,
    Text,
    Stack,
    Button,
    Flex,
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  import '../assets/css/Main.css'

  export default function NotFound() {
    return (
      <>
        <Box textAlign="center" fontSize="xl">
          <Flex minH="100vh" p={3} alignItems='center' justifyContent='center'>
            <Stack spacing={8} justifyContent='center'>
              <Text fontSize={160} fontWeight={800} className='bgText'>
                Ooops
              </Text>
              <Text fontSize={26} fontWeight={700}>
                404 - Page Not Found
              </Text>
              <Text fontSize='sm'>The page you are looking for might have been removed <br /> had its name changed or is temporarily unavailable.</Text>
              <Box textAlign='center'>
                {/* <Link to='/'>
                  <Button leftIcon={<ArrowBackIcon />} variant='outline' colorScheme='teal' w='140px' h='45px' >
                    Go Back
                  </Button>
                </Link> */}
              </Box>
            </Stack>
          </Flex>
        </Box>
      </>
    );
  }