import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map(doc => doc.data());
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Admin Dashboard</Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Role</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, index) => (
            <Tr key={index}>
              <Td>{user.email}</Td>
              <Td>{user.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};

export default AdminDashboard;