import { useEffect, useState } from "react";
import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td, Button, Input } from "@chakra-ui/react";
import { collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";

const BankPartnersManagement = () => {
  const [banks, setBanks] = useState([]);
  const [newBank, setNewBank] = useState("");

  useEffect(() => {
    const fetchBanks = async () => {
      const banksCollection = collection(db, "banks");
      const banksSnapshot = await getDocs(banksCollection);
      const banksList = banksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBanks(banksList);
    };

    fetchBanks();
  }, []);

  const addBank = async () => {
    if (newBank) {
      await addDoc(collection(db, "banks"), { name: newBank });
      setBanks([...banks, { name: newBank }]);
      setNewBank("");
    }
  };

  const removeBank = async (id) => {
    await deleteDoc(doc(db, "banks", id));
    setBanks(banks.filter(bank => bank.id !== id));
  };

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Bank Partners Management</Text>
      <VStack spacing={4}>
        <Input placeholder="New Bank Name" value={newBank} onChange={(e) => setNewBank(e.target.value)} />
        <Button onClick={addBank}>Add Bank</Button>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Bank Name</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {banks.map((bank, index) => (
              <Tr key={index}>
                <Td>{bank.name}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => removeBank(bank.id)}>Remove</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default BankPartnersManagement;