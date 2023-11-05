import { List, ListItem } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <List display={'flex'} justifyContent={'space-around'} border={'1px'} padding={6} background={'slate'} borderRadius={4} marginBottom={20}>
      <ListItem>
        <Link to="/">Home</Link>
      </ListItem>
      <ListItem>
        <Link to="/contacts">Contacts</Link>
      </ListItem>
      <ListItem>
        <Link to="/redirector">Redirect to Payment</Link>
      </ListItem>
      <ListItem>
        <Link to="/redirectApp">Handle redirection back</Link>
      </ListItem>
    </List>
  );
}
