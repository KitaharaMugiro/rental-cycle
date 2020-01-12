import { SensorController } from "./../controller/SensorController";
import { SensorValues } from "./../../../common/SensorValues";
import {
  WebSocketResponseProtocol,
  WebSocketRequestProtocol
} from "./../../../common/protocol/WebSocketProtocol";
import * as WebSocket from "ws";

export function TestWebsocket(wss: WebSocket.Server) {
  wss.on("connection", (ws: WebSocket) => {
    console.log("websocket connection");
    ws.on("message", (message: string) => {
      const request: WebSocketRequestProtocol<any> = JSON.parse(message);
      if (request.event === "sensor-values") {
        const data: SensorValues = request.data;
        new SensorController().postSensorValues(data);
      } else {
        const response: WebSocketResponseProtocol = {
          data: {
            message: `Hello, you sent -> ${request.data.message}`
          }
        };
        ws.send(JSON.stringify(response));
      }
    });
  });
}
