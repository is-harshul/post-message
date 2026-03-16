import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box maxW="720px" mx="auto" px={6} py={20}>
      <VStack align="start" spacing={4}>
        <Heading size="lg" color="white">
          Something went wrong
        </Heading>
        <Text color="whiteAlpha.500" fontSize="sm">
          An unexpected error occurred. Check the console for details.
        </Text>
        <Box
          bg="whiteAlpha.50"
          border="1px solid"
          borderColor="whiteAlpha.100"
          borderRadius="md"
          px={4}
          py={3}
          w="full"
        >
          <Text color="red.300" fontSize="sm" fontFamily="mono">
            {(error as { statusText?: string; message?: string })?.statusText ||
              (error as { message?: string })?.message ||
              "Unknown error"}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
