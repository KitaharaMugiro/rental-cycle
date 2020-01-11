import {
  WebSocketResponseProtocol,
  WebSocketRequestProtocol
} from "./../../../common/protocol/WebSocketProtocol";
import * as WebSocket from "ws";

export function TestWebsocket(wss: WebSocket.Server) {
  wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
      const request: WebSocketRequestProtocol = JSON.parse(message);
      const response: WebSocketResponseProtocol = {
        data: {
          message: `Hello, you sent -> ${request.data.message}`
        }
      };
      ws.send(JSON.stringify(response));
    });

    //サーバからクライアントに向かってメッセージを送る
    setInterval(() => {
      wss.clients.forEach(c => {
        const response: WebSocketResponseProtocol = {
          data: {
            message: `This is sending you all`
          }
        };
        c.send(JSON.stringify(response));
      });
    }, 3000);
  });
}
