import { Container, Text, VStack, Input, Textarea, Button } from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";

const CustomerSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.post("/api/support", { name, email, message });
      setSuccess("Your message has been sent successfully!");
      setError("");
    } catch (err) {
      setError("Failed to send your message. Please try again.");
      setSuccess("");
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Text fontSize="2xl">Customer Support</Text>
        <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
        <Button onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
};

export default CustomerSupport;