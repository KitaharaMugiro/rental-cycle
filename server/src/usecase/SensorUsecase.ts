import { SensorsTable } from "./../dynamo/SensorsTable";
export const SensorUsecase = {
  async getSensorValue(id: string) {
    const table = new SensorsTable();
    return await table.getItem({ systemAppId: id });
  }
};
