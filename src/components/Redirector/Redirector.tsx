import { windowOpener } from "@/utils/windowOpener";
import { Button, Container, Heading, Text } from "@chakra-ui/react";
import ListenerApp from "../ListenerApp/ListenerApp";
import { useState } from "react";

export default function Redirector() {

  const [listenNow, setListenNow] = useState(false);

  /** Opens a window and creates the window object closure in the util file */
  const handleRedirectClick = () => {
    const url = 'https://redirection-mock.vercel.app/'
    windowOpener(url, window);
    setListenNow(true);
  };

  return (
    <Container display={'flex'} flexDirection={'column'}>
      <Heading>Redirector</Heading>
      <Button onClick={handleRedirectClick} margin={12} colorScheme='green'>
        Redirect to make payment
      </Button>
      {listenNow ? <ListenerApp /> : <Text as='b' color='yellow.600'>Not Listening to post message yet</Text>}
    </Container>
  )
}
