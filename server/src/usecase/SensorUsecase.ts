import { SensorsTable } from "./../dynamo/SensorsTable";
import { SensorValues } from "../../../common/SensorValues";
export const SensorUsecase = {
  async getSensorValue(id: string) {
    const table = new SensorsTable();
    const data = await table.getItem({ systemAppId: id });
    return data;
  },

  async saveSensorValue(sensorValues: SensorValues) {
    const table = new SensorsTable();
    table.addItem(sensorValues);
  }
};
