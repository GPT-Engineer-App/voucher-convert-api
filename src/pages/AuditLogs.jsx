import { useEffect, useState } from "react";
import { Container, Text, VStack, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

const AuditLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchLogs = async () => {
      const logsCollection = collection(db, "auditLogs");
      const logsSnapshot = await getDocs(logsCollection);
      const logsList = logsSnapshot.docs.map(doc => doc.data());
      setLogs(logsList);
    };

    fetchLogs();
  }, []);

  return (
    <Container centerContent>
      <Text fontSize="2xl" mb={4}>Audit Logs</Text>
      <VStack spacing={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>User</Th>
              <Th>Action</Th>
              <Th>Timestamp</Th>
            </Tr>
          </Thead>
          <Tbody>
            {logs.map((log, index) => (
              <Tr key={index}>
                <Td>{log.user}</Td>
                <Td>{log.action}</Td>
                <Td>{new Date(log.timestamp.seconds * 1000).toLocaleString()}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
};

export default AuditLogs;