import "reflect-metadata";
import * as express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { TestWebsocket } from "./websocket/TestWebsocket";
import { UserController } from "./controller/TestController";
import { createExpressServer } from "routing-controllers";

const server = createExpressServer({
  controllers: [__dirname + "/controller/*.ts"]
});

//websocket
const wss = new WebSocket.Server({ server });
TestWebsocket(wss);

server.listen(8999, () => {
  console.log("works on port 8999 :)");
});
