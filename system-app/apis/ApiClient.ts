import axios from "axios";

export class ApiClient {
  private host: string = "";
  constructor() {
    console.log("env:" + process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      this.host = "http://localhost:8999";
    } else if (process.env.NODE_ENV === "production") {
      this.host =
        "http://rental-cycle-server-506242718.ap-northeast-1.elb.amazonaws.com";
    }
  }
}
