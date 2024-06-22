import { useEffect, useState } from "react";
import { Container, Text, VStack, Button, Table, Thead, Tbody, Tr, Th, Td, Input } from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { collection, getDocs, query, where, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { CSVLink } from "react-csv";

const UserDashboard = () => {
  const [vouchers, setVouchers] = useState([]);
  const [file, setFile] = useState(null);
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

  const headers = [
    { label: "Voucher Code", key: "code" },
    { label: "Amount", key: "amount" },
    { label: "Status", key: "status" }
  ];

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async (event) => {
      const csvData = event.target.result;
      const rows = csvData.split("\n").slice(1);
      for (const row of rows) {
        const [code, amount, status] = row.split(",");
        await addDoc(collection(db, "vouchers"), {
          userId: user.uid,
          code,
          amount,
          status
        });
      }
      fetchVouchers();
    };
    reader.readAsText(file);
  };

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>User Dashboard</Text>
      <VStack spacing={4}>
        <Button colorScheme="teal">Convert Voucher</Button>
        <CSVLink data={vouchers} headers={headers} filename={"vouchers.csv"}>
          <Button colorScheme="teal">Export Vouchers</Button>
        </CSVLink>
        <Input type="file" accept=".csv" onChange={handleFileUpload} />
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