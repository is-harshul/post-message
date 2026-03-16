import { windowOpener } from "@/utils/windowOpener";
import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import ListenerApp from "../ListenerApp/ListenerApp";
import { useState } from "react";

export default function Redirector() {
  const [listenNow, setListenNow] = useState(false);

  const handleRedirectClick = () => {
    const origin = import.meta.env.VITE_APP_ORIGIN || window.location.origin;
    const redirectUrl = `${origin}/redirectApp`;
    const url = `https://redirection-mock.vercel.app/?redirect=${encodeURIComponent(redirectUrl)}`;
    windowOpener(url, window);
    setListenNow(true);
  };

  return (
    <VStack align="start" spacing={8}>
      <Box>
        <Heading size="lg" color="white" mb={2}>
          Payment Flow
        </Heading>
        <Text color="whiteAlpha.600" fontSize="sm">
          This page opens a new window to simulate a payment redirect.
          Once the payment completes, the child window sends a
          <Text as="span" fontFamily="mono" fontSize="xs" mx={1}>postMessage</Text>
          back to this page with the result.
        </Text>
      </Box>

      <Box
        w="full"
        bg="whiteAlpha.50"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="md"
        p={5}
      >
        <Text color="whiteAlpha.400" fontSize="xs" textTransform="uppercase" letterSpacing="0.1em" mb={3}>
          Step 1: Initiate Payment
        </Text>
        <Text color="whiteAlpha.500" fontSize="sm" mb={4}>
          Click the button below to open a new window. A reference to
          that window is saved so we can listen for its messages.
        </Text>
        <Button
          onClick={handleRedirectClick}
          size="sm"
          bg="white"
          color="black"
          _hover={{ bg: "whiteAlpha.800" }}
          fontWeight={500}
          borderRadius="md"
        >
          Open Payment Window
        </Button>
      </Box>

      <Box w="full">
        <Text color="whiteAlpha.400" fontSize="xs" textTransform="uppercase" letterSpacing="0.1em" mb={3}>
          Step 2: Listen for Response
        </Text>
        {listenNow ? (
          <ListenerApp />
        ) : (
          <Box
            border="1px dashed"
            borderColor="whiteAlpha.200"
            borderRadius="md"
            p={4}
          >
            <Text color="whiteAlpha.400" fontSize="sm">
              Waiting for you to open the payment window first.
            </Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
}
