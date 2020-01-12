import {
  Controller,
  Get,
  Post,
  QueryParam,
  BodyParam
} from "routing-controllers";
import { SensorUsecase } from "./../usecase/SensorUsecase";
import { SensorValues } from "../../../common/SensorValues";

@Controller("/sensor")
export class SensorController {
  @Get("/")
  async getSensorValues(@QueryParam("id") systemAppId: string) {
    return SensorUsecase.getSensorValue(systemAppId);
  }

  @Post("/")
  async postSensorValues(
    @BodyParam("sensorValues") sensorValues: SensorValues
  ) {
    return SensorUsecase.saveSensorValue(sensorValues);
  }
}
