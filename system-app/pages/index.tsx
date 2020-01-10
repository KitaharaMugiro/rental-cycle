import { useEffect, useState } from "react";
import { WebSocketClient } from "../libs/WebsocketClient";

export default () => {
  const [text, setText] = useState("you will see some message");
  useEffect(() => {
    const client = new WebSocketClient();
    client.test(text => setText(text));
  }, []);

  return <div>{text}</div>;
};
