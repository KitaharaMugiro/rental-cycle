import { Controller, Get } from "routing-controllers";
import axios from "axios";

@Controller("/api")
export class UserController {
  @Get("/ws")
  async getWebsocketUrl() {
    try {
      const queryUrl = "http://169.254.169.254/latest/meta-data/public-ipv4";
      const response = await axios.get(queryUrl);
      const IP_ADDRESS = response;
      return `ws://${IP_ADDRESS}:8999`;
    } catch {
      return "ws://localhost:8999";
    }
  }
}
