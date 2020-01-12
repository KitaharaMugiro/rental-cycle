import { useEffect, useState } from "react";
import { WebSocketClient } from "../libs/WebsocketClient";
import axios from "axios";
import { ApiClient } from "../apis/ApiClient";

export default () => {
  const [text, setText] = useState("you will see some message");
  useEffect(() => {
    const setUpWebsocket = async () => {
      const apiClient = new ApiClient();
      const url = await apiClient.getWebsocketUrl();
      const client = new WebSocketClient(url);
      client.test(text => setText(text));
    };

    setUpWebsocket();
  }, []);

  return <div>{text}</div>;
};
