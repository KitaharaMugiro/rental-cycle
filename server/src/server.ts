import * as config from "config";
import "reflect-metadata";
import { createExpressServer, useExpressServer } from "routing-controllers";
import * as WebSocket from "ws";
import { TestWebsocket } from "./websocket/TestWebsocket";

var express = require("express");
var app = express();
var server = require("http").createServer(app);

useExpressServer(app, {
  cors: true,
  controllers: [__dirname + "/controller/*.ts"]
});

//websocket
const wss = new WebSocket.Server({ server, path: "/ws" });
TestWebsocket(wss);

server.listen(8999, () => {
  console.log(config);
  console.log("works on port 8999 :)");
});
