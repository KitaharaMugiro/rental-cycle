import {
  WebSocketResponseProtocol,
  WebSocketRequestProtocol
} from "./../../common/protocol/WebSocketProtocol";
import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

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

server.listen(8999, () => {
  const address = server?.address() as any;
  console.log(`Server started on port ${address.port} :)`);
});
