import { Container, Heading, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function PaymentRedirect() {
  const [searchParams] = useSearchParams();
  const status = useRef(searchParams.get('status'));  

  const [redirectSeconds, setRedirectSeconds] = useState(5);

  /**
   * The Window interface's opener property returns a reference to the window that opened the window, 
   * either with open(), or by navigating a link with a target attribute.
   * NOTE: in case of iFrame use -> `window.parent.opener`
   */
  const parentWindow = window.opener;

  /** Sends the postMessage and closes the currentWindow after sending post message to app */
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    try {
      parentWindow?.postMessage({status: status.current, id: 'my-apps-payment'}, '*');
      intervalId = setInterval(() => {
        setRedirectSeconds((prevSeconds) => {
          if (prevSeconds > 0) return (prevSeconds - 1);

          clearInterval(intervalId);

          /**
           * Closing the window after sending the postMessage. Since work here is done,
           * now Listener will have to do whatever they want with the message.
           */
          window.close();
          return 0;
        })
      }, 1000);
    } catch (er) {
      console.log(er);
    }

    /** Cleanup */
    return () => {
      clearInterval(intervalId);
    }
  }, [parentWindow, status.current]);

  /**
   * Should observe the opened window's object here, if it is closed or not. 👇
   * if window is closed: `failure`.
   * else: wait till it resolves to either of `success` | `failure`
   */
  /** That window object `windowToBeOpened` will not loose its ref, as it forms a closure in the `windowOpener.ts` file. */
  return (
    <Container>
      <Heading marginBottom={12}>Payment Redirect is handled here</Heading>
      <Text color={'gray.500'} as={'b'} fontSize={24}>
        Payment status directly from params:{' '}
      </Text>
      <Text color={status.current === 'success' ? 'green' : 'red' } as={'b'} fontSize={24}>
        {searchParams.get('status')}
      </Text>
      <Text as='p' color={'slate'}>Redirecting to handler in {redirectSeconds} secs...</Text>
    </Container>
  );
}
