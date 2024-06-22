import { useState } from "react";
import { Container, Input, Button, VStack, Text, Select } from "@chakra-ui/react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const VoucherConversion = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;

  const handleConvert = async () => {
    try {
      const response = await axios.post("/api/convert-voucher", { voucherCode, amount, currency });
      if (response.data.success) {
        await addDoc(collection(db, "vouchers"), {
          userId: user.uid,
          code: voucherCode,
          amount,
          currency,
          status: "Pending"
        });
        setSuccess("Voucher conversion successful!");
        setError("");
      } else {
        setError("Voucher conversion failed.");
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
        <Text fontSize="2xl">Convert Voucher</Text>
        <Input placeholder="Voucher Code" value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} />
        <Input placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <Select value={currency} onChange={(e) => setCurrency(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </Select>
        {error && <Text color="red.500">{error}</Text>}
        {success && <Text color="green.500">{success}</Text>}
        <Button onClick={handleConvert}>Convert</Button>
      </VStack>
    </Container>
  );
};

export default VoucherConversion;