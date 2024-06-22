import { useEffect, useState } from "react";
import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const BankRepresentativePortal = () => {
  const [vouchers, setVouchers] = useState([]);

  useEffect(() => {
    const fetchVouchers = async () => {
      const vouchersCollection = collection(db, "vouchers");
      const vouchersSnapshot = await getDocs(vouchersCollection);
      const vouchersList = vouchersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVouchers(vouchersList);
    };

    fetchVouchers();
  }, []);

  const approveVoucher = async (id) => {
    const voucherDoc = doc(db, "vouchers", id);
    await updateDoc(voucherDoc, { status: "Approved" });
    setVouchers(vouchers.map(voucher => voucher.id === id ? { ...voucher, status: "Approved" } : voucher));
  };

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Bank Representative Portal</Text>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Voucher Code</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vouchers.map((voucher, index) => (
              <Tr key={index}>
                <Td>{voucher.code}</Td>
                <Td>{voucher.amount}</Td>
                <Td>{voucher.status}</Td>
                <Td>
                  {voucher.status !== "Approved" && (
                    <Button colorScheme="teal" onClick={() => approveVoucher(voucher.id)}>Approve</Button>
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default BankRepresentativePortal;