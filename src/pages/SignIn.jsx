import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Container, Input, Button, VStack, Text } from "@chakra-ui/react";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to dashboard or home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container centerContent>
      <VStack spacing={4}>
        <Text fontSize="2xl">Sign In</Text>
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <Text color="red.500">{error}</Text>}
        <Button onClick={handleSignIn}>Sign In</Button>
      </VStack>
    </Container>
  );
};

export default SignIn;