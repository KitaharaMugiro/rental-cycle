import { SensorValues } from "./../../common/SensorValues";
import {
  WebSocketRequestProtocol,
  WebSocketResponseProtocol
} from "./../../common/protocol/WebSocketProtocol";
export class WebSocketClient {
  private ws: WebSocket;
  static instance: WebSocketClient;

  static getInstance() {
    if (!this.instance) {
      this.instance = new WebSocketClient();
    }
    return this.instance;
  }

  private constructor() {
    console.log("env:" + process.env.NODE_ENV);
    let url: string;
    if (process.env.NODE_ENV === "development") {
      url = "ws://localhost:8999/ws";
    } else if (process.env.NODE_ENV === "production") {
      url =
        "ws://rental-cycle-server-506242718.ap-northeast-1.elb.amazonaws.com/ws";
    }
    console.log("websocket url = " + url);
    this.ws = new WebSocket(url);
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
