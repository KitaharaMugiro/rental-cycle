import { Controller, Get } from "routing-controllers";
import axios from "axios";
import * as config from "config";

@Controller("/api")
export class UserController {
  @Get("/ws")
  async getWebsocketUrl() {
    if (config.get("env") === "production") {
      const queryUrl = "http://169.254.169.254/latest/meta-data/public-ipv4";
      const response = await axios.get(queryUrl);
      const IP_ADDRESS = response.data;
      return `ws://${IP_ADDRESS}:8999`;
    } else {
      return "ws://localhost:8999";
    }
  }
}
