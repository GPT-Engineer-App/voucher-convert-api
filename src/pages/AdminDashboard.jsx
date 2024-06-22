import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Container, Table, Thead, Tbody, Tr, Th, Td, Text, Button } from "@chakra-ui/react";
import { CSVLink } from "react-csv";

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

  const headers = [
    { label: "Email", key: "email" },
    { label: "Role", key: "role" }
  ];

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Admin Dashboard</Text>
      <CSVLink data={users} headers={headers} filename={"users.csv"}>
        <Button colorScheme="teal" mb={4}>Export Users</Button>
      </CSVLink>
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