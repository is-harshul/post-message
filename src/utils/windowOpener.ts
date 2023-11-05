/** Adds a close listener to the windowObj passed to it */
const addCloseListener = (windowObj: Window) => {
  let intervalId: NodeJS.Timeout;
  return {
    promise: new Promise((resolve) => {
      intervalId = setInterval(() => {
        if (windowObj.closed) {
          clearInterval(intervalId);
          resolve("Window closed");
        }
      }, 500);
    }),
    cancel: () => {
      clearInterval(intervalId);
    },
  };
};

/** Closure here */
let subscribedWindow: Window = window;

/**
 * It just opens the window, and keeps the
 * closure for the window object stored stored `subscribedWindow`, in case it gets unmounted,
 * we still do not lose the opened window's reference.
 */
export const windowOpener = (
  url: string,
  windowReference: Window,
  // name = "PW"
) => {
  if (windowReference) subscribedWindow = windowReference;
  // subscribedWindow = windowReference ?? window;
  subscribedWindow.open(url);
};

/**
 * This listener can be called and be used at any place in the code,
 * where you want to listen to that window, if it is success/failed/closed.
 */
export const messageListener = (onSuccessCb: () => void, onFailureCb: () => void) => {
  // Listen for messages from child window

  /**
   * Adding a close listener to the window. Just in case the user closes
   * the newly opened tab/window we should get to know that.
   */
  const windowWithCloseListener = addCloseListener(subscribedWindow);

  /** Message handler as the event triggers from our `PostPaymentRedirect.tsx` landing handler app */
  const onMessageHandler = (event: MessageEvent) => {
    if (event.data.id !== "my-apps-payment") return;

    let message;
    try {
      message = event.data;
    } catch (e) {
      windowWithCloseListener.cancel();
      subscribedWindow.removeEventListener("message", onMessageHandler);
      subscribedWindow.close();
    }

    console.log(message["status"])
    /** Check for desired value and perform action accordingly */
    if (message["status"] === "success") {
      subscribedWindow.close();
      onSuccessCb();
    } else if (message["status"] === "failure") {
      subscribedWindow.close();
      onFailureCb();
    } else {
      subscribedWindow.close();
      onFailureCb();
    }
  };

  /** Adding the message event listener on the app */
  subscribedWindow.addEventListener("message", onMessageHandler);

  windowWithCloseListener.promise.then(()=> {
    onFailureCb();
  })

  /** Cleanup fn */
  return () => {
    windowWithCloseListener.cancel();
    subscribedWindow.removeEventListener("message", onMessageHandler);
  };
};
