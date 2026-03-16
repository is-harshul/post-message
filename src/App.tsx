import { Box, Heading, Text, VStack, Code, Flex } from '@chakra-ui/react';
import './App.css'

function App() {
  return (
    <VStack align="start" spacing={8}>
      <Box>
        <Heading size="lg" color="white" mb={2}>
          Window PostMessage Demo
        </Heading>
        <Text color="whiteAlpha.600" fontSize="sm">
          A minimal app demonstrating cross-window communication
          using the browser's <Code fontSize="xs" bg="whiteAlpha.100" color="whiteAlpha.700">postMessage</Code> API.
        </Text>
      </Box>

      <Box w="full" borderTop="1px solid" borderColor="whiteAlpha.100" pt={6}>
        <Text color="whiteAlpha.400" fontSize="xs" textTransform="uppercase" letterSpacing="0.1em" mb={4}>
          How it works
        </Text>
        <VStack align="start" spacing={4}>
          <Step number="1" title="Open a child window">
            The parent app opens a new browser window pointing to a
            payment page. A reference to that window is stored in a closure.
          </Step>
          <Step number="2" title="Child sends a message back">
            After the payment completes, the child window uses
            <Code fontSize="xs" bg="whiteAlpha.100" color="whiteAlpha.700" mx={1}>window.opener.postMessage()</Code>
            to send the result (success or failure) to the parent.
          </Step>
          <Step number="3" title="Parent listens and reacts">
            The parent window has an event listener for incoming messages.
            It reads the payload and updates the UI accordingly.
          </Step>
        </VStack>
      </Box>

      <Box
        w="full"
        bg="whiteAlpha.50"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="md"
        p={4}
      >
        <Text color="whiteAlpha.500" fontSize="xs">
          Try it out: navigate to "Payment Flow" in the nav above to start the demo.
          You can also visit "Contacts" to see a sample detail page.
        </Text>
      </Box>
    </VStack>
  );
}

function Step({ number, title, children }: { number: string; title: string; children: React.ReactNode }) {
  return (
    <Flex gap={3} align="start">
      <Text
        fontSize="xs"
        color="whiteAlpha.300"
        fontWeight={600}
        bg="whiteAlpha.50"
        borderRadius="full"
        w={5}
        h={5}
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        mt={0.5}
      >
        {number}
      </Text>
      <Box>
        <Text color="whiteAlpha.800" fontSize="sm" fontWeight={500}>
          {title}
        </Text>
        <Text color="whiteAlpha.500" fontSize="sm" lineHeight="tall">
          {children}
        </Text>
      </Box>
    </Flex>
  );
}

export default App;
