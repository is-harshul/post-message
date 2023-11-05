import { messageListener } from "@/utils/windowOpener";
import { Container, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ListenerApp() {
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    /** Listening to the post message from `PostPaymentRedirect` app */
    const cleanUp = messageListener(
      () => setPaymentStatus("Awesome! Payment successful"),
      () => setPaymentStatus("Sorry, payment Failed")
    );
    return () => {
      cleanUp();
    };
  }, []);

  return (
    <Container border={'1px'} borderRadius={8} padding={8} marginTop={8}>
      <Text
        color={'blackAlpha.600'}
        as={"b"}
        fontSize={24}
      >
        Payment Message:{' '}
      </Text>
      <Text
        color={ !paymentStatus ? 'blackAlpha.800' : paymentStatus.startsWith("Awesome") ? "green" : "red"}
        as={"b"}
        fontSize={24}
      >
        {paymentStatus || 'Pending...'}
      </Text>
    </Container>
  );
}
