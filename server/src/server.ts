import * as config from "config";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import * as WebSocket from "ws";
import { TestWebsocket } from "./websocket/TestWebsocket";

const server = createExpressServer({
  cors: true,
  controllers: [__dirname + "/controller/*.ts"]
});

//websocket
const wss = new WebSocket.Server({ server });
TestWebsocket(wss);

server.listen(8999, () => {
  console.log(config);
  console.log("works on port 8999 :)");
});
