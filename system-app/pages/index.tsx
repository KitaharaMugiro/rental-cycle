import { useEffect, useState } from "react";
import { WebSocketClient } from "../libs/WebsocketClient";
import axios from "axios";

export default () => {
  const [text, setText] = useState("you will see some message");
  useEffect(() => {
    const setUpWebsocket = async () => {
      const response = await axios.get(
        "http://rental-cycle-server-506242718.ap-northeast-1.elb.amazonaws.com/api/ws"
      );
      console.log(response);
      const client = new WebSocketClient(response.data);
      client.test(text => setText(text));
    };

    setUpWebsocket();
  }, []);

  return <div>{text}</div>;
};
