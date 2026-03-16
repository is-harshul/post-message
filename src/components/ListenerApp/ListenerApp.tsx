import { messageListener } from "@/utils/windowOpener";
import { Box, Flex, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function ListenerApp() {
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    const cleanUp = messageListener(
      () => setPaymentStatus("success"),
      () => setPaymentStatus("failure")
    );
    return () => {
      cleanUp();
    };
  }, []);

  const isPending = !paymentStatus;
  const isSuccess = paymentStatus === "success";

  return (
    <Box
      bg="whiteAlpha.50"
      border="1px solid"
      borderColor="whiteAlpha.100"
      borderRadius="md"
      p={4}
    >
      <Text color="whiteAlpha.400" fontSize="xs" mb={2}>
        Listening for postMessage events from child window...
      </Text>
      <Flex align="center" gap={2}>
        <Box
          w={2}
          h={2}
          borderRadius="full"
          bg={isPending ? "yellow.400" : isSuccess ? "green.400" : "red.400"}
        />
        <Text
          color={isPending ? "whiteAlpha.600" : isSuccess ? "green.300" : "red.300"}
          fontSize="sm"
          fontWeight={500}
        >
          {isPending
            ? "Pending. Waiting for the child window to respond."
            : isSuccess
            ? "Payment successful. Message received from child window."
            : "Payment failed. Message received from child window."}
        </Text>
      </Flex>
    </Box>
  );
}
