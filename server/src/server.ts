import "reflect-metadata";
import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { TestWebsocket } from "./websocket/TestWebsocket";

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });
TestWebsocket(wss);

server.listen(8999, () => {
  const address = server?.address() as any;
  console.log(`Server started on port ${address.port} :)`);
});
