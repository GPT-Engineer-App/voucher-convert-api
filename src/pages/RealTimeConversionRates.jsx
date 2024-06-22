import { useEffect, useState } from "react";
import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import axios from "axios";

const RealTimeConversionRates = () => {
  const [rates, setRates] = useState([]);

  useEffect(() => {
    const fetchRates = async () => {
      const response = await axios.get("https://api.exchangerate-api.com/v4/latest/USD");
      setRates(Object.entries(response.data.rates));
    };

    fetchRates();
  }, []);

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Real-Time Conversion Rates</Text>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Currency</Th>
              <Th>Rate</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rates.map(([currency, rate], index) => (
              <Tr key={index}>
                <Td>{currency}</Td>
                <Td>{rate}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default RealTimeConversionRates;