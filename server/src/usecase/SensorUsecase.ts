import { SensorsTable } from "./../dynamo/SensorsTable";
export const SensorUsecase = {
  async getSensorValue(id: string) {
    const table = new SensorsTable();
    const data = await table.getItem({ systemAppId: id });
    return data;
  }
};
