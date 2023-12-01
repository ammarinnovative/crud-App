import { Box, Table, Thead, Tbody, Tr, Th, Text, Td, Image, Button, Stack } from '@chakra-ui/react';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';
import { css } from '@emotion/react'; 
const CardInTable = ({ customersData, deleteCustomer, editCustomer }) => {
  const handleEditCustomer = (item) => {
    editCustomer(item);
  };

  const handleDeleteCustomer = (itemId) => {
    deleteCustomer(itemId);
  };

  return (
    <Box overflowX="auto">
      <Table variant="simple" width="95%" margin="auto" borderRadius="10px" >
        <Thead>
          <Tr color={"#015249"} fontWeight={"600"} bg="#bce4d6">
            <Th></Th>
            <Th>Customer ID</Th>
            <Th>Customer Name</Th>
            <Th>Customer Email</Th>
            <Th></Th>
          </Tr>
        </Thead>
        
        <Tbody style={{marginTop:"10px"}}>
          {customersData.length > 0 &&
            customersData.map((item) => (
              <Tr key={item.id} bg="white" css={css`margin-bottom: 0.5rem`}>
                <Td>
                  <Image
                    src={item.avatar}
                    borderRadius={{ base: '50%', md: '10px' }}
                    width={{ base: '40px', md: '90px' }}
                    height={{ base: '40px', md: '60px' }}
                    alt="image"
                  />
                </Td>
                <Td>{item.id}</Td>
                <Td>
                  <Text>
                    {item.first_name} {item.last_name}
                  </Text>
                </Td>
                <Td color="#a7aaad">{item.email}</Td>
                <Td>
                  <Stack direction="row" alignItems="center" justifyContent="flex-end">
                    <Button
                      onClick={() => handleEditCustomer(item)}
                      width="80px"
                      _hover={{ bg: '#a0e2ba' }}
                      height="30px"
                      color="#008212"
                      bg="#a0e2ba"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDeleteCustomer(item.id)}
                      width="80px"
                      _hover={{ bg: '#ff9595' }}
                      height="30px"
                      color="#f30000"
                      bg="#ff9595"
                    >
                      Delete
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default CardInTable;
