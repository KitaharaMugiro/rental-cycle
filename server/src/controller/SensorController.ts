import { Controller, Get, Post, QueryParam } from "routing-controllers";
import { SensorUsecase } from "./../usecase/SensorUsecase";

@Controller("/sensor")
export class SensorController {
  @Get("/")
  async getSensorValues(@QueryParam("id") systemAppId: string) {
    return SensorUsecase.getSensorValue(systemAppId);
  }

  @Post("/")
  async postSensorValues() {}
}
