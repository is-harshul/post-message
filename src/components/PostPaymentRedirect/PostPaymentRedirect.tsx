import { Box, Heading, Text, VStack, Flex } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentRedirect() {
  const [searchParams] = useSearchParams();
  const status = useRef(searchParams.get('status'));

  const [redirectSeconds, setRedirectSeconds] = useState(5);

  const parentWindow = window.opener;

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    try {
      const targetOrigin = import.meta.env.VITE_APP_ORIGIN || '*';
      parentWindow?.postMessage({ status: status.current, id: 'my-apps-payment' }, targetOrigin);
      intervalId = setInterval(() => {
        setRedirectSeconds((prevSeconds) => {
          if (prevSeconds > 0) return (prevSeconds - 1);
          clearInterval(intervalId);
          window.close();
          return 0;
        });
      }, 1000);
    } catch (er) {
      console.log(er);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [parentWindow, status.current]);

  const statusValue = status.current;
  const statusDisplay = statusValue === 'success'
    ? { label: 'Success', color: 'green', dotBg: 'green.400', textColor: 'green.300' }
    : statusValue === 'failure'
    ? { label: 'Failed', color: 'red', dotBg: 'red.400', textColor: 'red.300' }
    : { label: 'Not received', color: 'yellow', dotBg: 'yellow.400', textColor: 'yellow.300' };

  const hasParent = !!parentWindow;

  return (
    <VStack align="start" spacing={8}>
      <Box>
        <Heading size="lg" color="white" mb={2}>
          Redirect Handler
        </Heading>
        <Text color="whiteAlpha.600" fontSize="sm" mb={3}>
          This page acts as a landing page after a payment redirect. It is not
          meant to be opened directly.
        </Text>
        <Text color="whiteAlpha.500" fontSize="sm">
          In a real payment flow, the user clicks "Pay" on your app, gets
          redirected to a third-party payment gateway, and after completing
          payment, the gateway redirects back here with the result in the URL
          (e.g. <Text as="span" fontFamily="mono" fontSize="xs">?status=success</Text>).
        </Text>
      </Box>

      {/* What this page does */}
      <Box
        w="full"
        bg="whiteAlpha.50"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="md"
        p={5}
      >
        <Text color="whiteAlpha.400" fontSize="xs" textTransform="uppercase" letterSpacing="0.1em" mb={3}>
          What happens here
        </Text>
        <VStack align="start" spacing={2}>
          <Text color="whiteAlpha.500" fontSize="sm">
            1. Read the <Text as="span" fontFamily="mono" fontSize="xs">?status</Text> param
            from the URL the payment gateway redirected to.
          </Text>
          <Text color="whiteAlpha.500" fontSize="sm">
            2. Send that status back to the parent window (the one that started the flow) using
            <Text as="span" fontFamily="mono" fontSize="xs" mx={1}>window.opener.postMessage()</Text>.
          </Text>
          <Text color="whiteAlpha.500" fontSize="sm">
            3. Auto-close this window after a few seconds, since its job is done.
          </Text>
        </VStack>
      </Box>

      {/* Current state */}
      <Box
        w="full"
        bg="whiteAlpha.50"
        border="1px solid"
        borderColor="whiteAlpha.100"
        borderRadius="md"
        p={5}
      >
        <Text color="whiteAlpha.400" fontSize="xs" textTransform="uppercase" letterSpacing="0.1em" mb={3}>
          Current State
        </Text>

        {/* Parent window check */}
        <Flex align="center" gap={2} mb={3}>
          <Box
            w={2}
            h={2}
            borderRadius="full"
            bg={hasParent ? "green.400" : "red.400"}
          />
          <Text color={hasParent ? "whiteAlpha.600" : "red.300"} fontSize="sm">
            {hasParent
              ? "Parent window detected. postMessage will be delivered."
              : "No parent window. This page was opened directly, not via window.open()."}
          </Text>
        </Flex>

        {/* Status param check */}
        <Flex align="center" gap={2} mb={4}>
          <Box
            w={2}
            h={2}
            borderRadius="full"
            bg={statusDisplay.dotBg}
          />
          <Text color={statusDisplay.textColor} fontSize="sm" fontWeight={500}>
            {statusDisplay.label}
          </Text>
          <Text color="whiteAlpha.400" fontSize="xs">
            (?status={searchParams.get('status') ?? 'missing'})
          </Text>
        </Flex>

        {statusValue ? (
          <Box bg="whiteAlpha.50" borderRadius="md" px={3} py={2}>
            <Text color="whiteAlpha.500" fontSize="xs">
              Message sent to parent. This window will close in{' '}
              <Text
                as="span"
                color="white"
                fontWeight={700}
                fontSize="md"
                fontFamily="mono"
                mx={1}
              >
                {redirectSeconds}
              </Text>
              s.
            </Text>
          </Box>
        ) : (
          <Box bg="whiteAlpha.50" borderRadius="md" px={3} py={2}>
            <Text color="yellow.300" fontSize="xs" mb={2}>
              No status param in URL.
            </Text>
            <Text color="whiteAlpha.400" fontSize="xs">
              To test this page properly, go to "Payment Flow" in the nav and click
              "Open Payment Window". The mock payment app will redirect here with
              the correct params and parent window context.
            </Text>
          </Box>
        )}
      </Box>
    </VStack>
  );
}
