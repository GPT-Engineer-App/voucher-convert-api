import { useEffect, useState } from "react";
import { Container, Text, VStack, Button } from "@chakra-ui/react";
import axios from "axios";

const AutomaticUpdates = () => {
  const [lastUpdate, setLastUpdate] = useState("");

  useEffect(() => {
    const fetchLastUpdate = async () => {
      const response = await axios.get("/api/last-update");
      setLastUpdate(response.data.lastUpdate);
    };

    fetchLastUpdate();
  }, []);

  const handleUpdate = async () => {
    await axios.post("/api/update-banks");
    const response = await axios.get("/api/last-update");
    setLastUpdate(response.data.lastUpdate);
  };

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Automatic Updates</Text>
      <VStack spacing={4}>
        <Text>Last Update: {lastUpdate}</Text>
        <Button onClick={handleUpdate}>Update Now</Button>
      </VStack>
    </Container>
  );
};

export default AutomaticUpdates;