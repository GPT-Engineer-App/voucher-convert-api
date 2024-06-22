import { useState } from "react";
import { Container, Input, Button, VStack, Text } from "@chakra-ui/react";
import axios from "axios";

const BankAPIIntegration = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleValidate = async () => {
    try {
      const response = await axios.post("/api/validate-voucher", { voucherCode, amount });
      if (response.data.valid) {
        setSuccess("Voucher is valid!");
        setError("");
      } else {
        setError("Voucher is invalid.");
        setSuccess("");
      }
    } catch (err) {
      setError(err.message);
      setSuccess("");
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Text fontSize="2xl">Validate Voucher</Text>
        <Input placeholder="Voucher Code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
        <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
        <Button onClick={handleValidate}>Validate</Button>
      </VStack>
    </Container>
  );
};

export default BankAPIIntegration;