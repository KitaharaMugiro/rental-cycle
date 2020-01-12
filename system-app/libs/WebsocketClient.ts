import { SensorValues } from "./../../common/SensorValues";
import {
  WebSocketRequestProtocol,
  WebSocketResponseProtocol
} from "./../../common/protocol/WebSocketProtocol";
//const WebSocketURL = "ws://52.194.191.134:8999";

export class WebSocketClient {
  private url: string;
  private ws: WebSocket;
  constructor(url: string) {
    console.log("websocket url = " + url);
    this.url = url;
    this.ws = new WebSocket(this.url);
  }

  sendSensorValues(sensorValues: SensorValues) {
    const subscribe: WebSocketRequestProtocol<SensorValues> = {
      event: "sensor-values",
      data: sensorValues
    };
    this.ws.send(JSON.stringify(subscribe));
  }

  test(cb: (text: string) => void) {
    cb("yo");
    cb("ws created");
    //5秒ごとにsubscribeを送る
    this.ws.onopen = () => {
      cb("on open");
      const subscribe: WebSocketRequestProtocol<any> = {
        event: "test",
        data: {
          message: `hello from system-app`
        }
      };

      setInterval(() => {
        cb("send it");
        this.ws.send(JSON.stringify(subscribe));
      }, 5000);
    };

    this.ws.onmessage = event => {
      cb("on message");
      const response: WebSocketResponseProtocol = JSON.parse(event.data);
      cb(response.data.message);
    };
  }
}
