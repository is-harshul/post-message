import { Tabs, TabList, Tab } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Tabs>
      <TabList>
        <Link to='/'><Tab>Home</Tab></Link>
        <Link to='/contacts'><Tab>Contacts</Tab></Link>
        <Link to='/redirectApp'><Tab>Redirection</Tab></Link>
      </TabList>
    </Tabs>
  );
}
