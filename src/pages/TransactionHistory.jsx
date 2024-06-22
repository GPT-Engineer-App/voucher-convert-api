import { useEffect, useState } from "react";
import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebaseConfig";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTransactions = async () => {
      if (user) {
        const transactionsCollection = collection(db, "transactions");
        const q = query(transactionsCollection, where("userId", "==", user.uid));
        const transactionsSnapshot = await getDocs(q);
        const transactionsList = transactionsSnapshot.docs.map(doc => doc.data());
        setTransactions(transactionsList);
      }
    };

    fetchTransactions();
  }, [user]);

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Transaction History</Text>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Transaction ID</Th>
              <Th>Voucher Code</Th>
              <Th>Amount</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((transaction, index) => (
              <Tr key={index}>
                <Td>{transaction.id}</Td>
                <Td>{transaction.voucherCode}</Td>
                <Td>{transaction.amount}</Td>
                <Td>{transaction.status}</Td>
                <Td>{new Date(transaction.date.seconds * 1000).toLocaleDateString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default TransactionHistory;