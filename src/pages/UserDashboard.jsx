import { useEffect, useState } from "react";
import { Container, Text, VStack, Button, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const UserDashboard = () => {
  const [vouchers, setVouchers] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchVouchers = async () => {
      if (user) {
        const vouchersCollection = collection(db, "vouchers");
        const q = query(vouchersCollection, where("userId", "==", user.uid));
        const vouchersSnapshot = await getDocs(q);
        const vouchersList = vouchersSnapshot.docs.map(doc => doc.data());
        setVouchers(vouchersList);
      }
    };

    fetchVouchers();
  }, [user]);

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>User Dashboard</Text>
      <VStack spacing={4}>
        <Button colorScheme="teal">Convert Voucher</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Voucher Code</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {vouchers.map((voucher, index) => (
              <Tr key={index}>
                <Td>{voucher.code}</Td>
                <Td>{voucher.amount}</Td>
                <Td>{voucher.status}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default UserDashboard;