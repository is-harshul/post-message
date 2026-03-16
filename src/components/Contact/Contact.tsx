import { Box, Heading, Text, VStack, Image, Flex, Button } from "@chakra-ui/react";

type Contact = {
  first: string;
  last: string;
  avatar: string;
  twitter: string;
  notes: string;
  favorite: boolean;
};

export default function Contact() {
  const contact: Contact = {
    first: "Tom",
    last: "Cat",
    avatar: "https://placekitten.com/g/200/200",
    twitter: "@tomnjerry",
    notes: "Eat Jerry",
    favorite: true,
  };

  return (
    <VStack align="start" spacing={8}>
      <Box>
        <Heading size="lg" color="white" mb={2}>
          Contacts
        </Heading>
        <Text color="whiteAlpha.600" fontSize="sm">
          A sample detail page showing how data can be displayed.
          This is not part of the postMessage flow, just a routing example.
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
        <Flex gap={5} align="start">
          <Image
            src={contact.avatar}
            alt={`${contact.first} ${contact.last}`}
            w={16}
            h={16}
            borderRadius="md"
            objectFit="cover"
          />
          <Box flex={1}>
            <Flex align="center" gap={2} mb={1}>
              <Text color="white" fontSize="md" fontWeight={500}>
                {contact.first} {contact.last}
              </Text>
              <Button
                size="xs"
                variant="ghost"
                color={contact.favorite ? "yellow.400" : "whiteAlpha.400"}
                _hover={{ bg: "whiteAlpha.100" }}
                aria-label={contact.favorite ? "Remove from favorites" : "Add to favorites"}
              >
                {contact.favorite ? "★" : "☆"}
              </Button>
            </Flex>
            {contact.twitter && (
              <Text fontSize="sm" color="whiteAlpha.500" mb={2}>
                <a
                  target="_blank"
                  href={`https://twitter.com/${contact.twitter}`}
                  rel="noreferrer"
                >
                  {contact.twitter}
                </a>
              </Text>
            )}
            {contact.notes && (
              <Text fontSize="sm" color="whiteAlpha.400" fontStyle="italic">
                {contact.notes}
              </Text>
            )}
          </Box>
        </Flex>
      </Box>
    </VStack>
  );
}
