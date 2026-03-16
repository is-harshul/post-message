import { Box, Flex, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/contacts", label: "Contacts" },
  { to: "/redirector", label: "Payment Flow" },
  { to: "/redirectApp", label: "Redirect Handler" },
];

export default function Header() {
  const location = useLocation();

  return (
    <Box
      as="nav"
      borderBottom="1px solid"
      borderColor="whiteAlpha.100"
      pb={4}
      mb={10}
    >
      <Text fontSize="xs" color="whiteAlpha.400" mb={3} letterSpacing="0.1em" textTransform="uppercase">
        postMessage Demo
      </Text>
      <Flex gap={6}>
        {navItems.map(({ to, label }) => (
          <Link key={to} to={to}>
            <Text
              fontSize="sm"
              color={location.pathname === to ? "white" : "whiteAlpha.500"}
              fontWeight={location.pathname === to ? 600 : 400}
              _hover={{ color: "white" }}
              transition="color 0.2s"
            >
              {label}
            </Text>
          </Link>
        ))}
      </Flex>
    </Box>
  );
}
