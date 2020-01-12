import {
  WebSocketRequestProtocol,
  WebSocketResponseProtocol
} from "./../../common/protocol/WebSocketProtocol";
//const WebSocketURL = "ws://52.194.191.134:8999";

export class WebSocketClient {
  private url: string;
  constructor(url: string) {
    console.log("websocket url = " + url);
    this.url = url;
  }

  test(cb: (text: string) => void) {
    cb("yo");
    const ws = new WebSocket(this.url);
    cb("ws created");
    //5秒ごとにsubscribeを送る
    ws.onopen = () => {
      cb("on open");
      const subscribe: WebSocketRequestProtocol = {
        event: "test",
        data: {
          message: `hello from system-app`
        }
      };

      setInterval(() => {
        cb("send it");
        ws.send(JSON.stringify(subscribe));
      }, 5000);
    };

    ws.onmessage = event => {
      cb("on message");
      const response: WebSocketResponseProtocol = JSON.parse(event.data);
      cb(response.data.message);
    };
  }
}
