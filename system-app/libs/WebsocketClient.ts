import {
  WebSocketRequestProtocol,
  WebSocketResponseProtocol
} from "./../../common/protocol/WebSocketProtocol";
const WebSocketURL = "ws://localhost:8999";

export class WebSocketClient {
  test(cb: (text: string) => void) {
    const ws = new WebSocket(WebSocketURL);

    //5秒ごとにsubscribeを送る
    ws.onopen = () => {
      const subscribe: WebSocketRequestProtocol = {
        event: "test",
        data: {
          message: `hello from system-app`
        }
      };

      setInterval(() => {
        ws.send(JSON.stringify(subscribe));
      }, 5000);
    };

    ws.onmessage = event => {
      const response: WebSocketResponseProtocol = JSON.parse(event.data);
      cb(response.data.message);
    };
  }
}
