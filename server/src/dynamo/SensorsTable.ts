import { DynamoHandler } from "./DynamoHandler";

export type SensorAttribute = {
  systemAppId: string;
  latitude?: number;
  longitude?: number;
  altitude?: number;
  positionAccuracy?: number;
  direction?: number;
  velocity?: number;
  timestamp?: number;
};

type SensorKey = {};

export class SensorsTable {
  handler: DynamoHandler;
  tableName = "sensors";
  keySchema = [{ AttributeName: "systemAppId", KeyType: "HASH" }];
  attributeSchema = [{ AttributeName: "systemAppId", AttributeType: "S" }];

  constructor() {
    this.handler = new DynamoHandler();
    // this.handler.createTable(
    //   this.tableName,
    //   this.keySchema,
    //   this.attributeSchema
    // );
  }

  addItem(item: SensorAttribute) {
    this.handler.createNewItem(this.tableName, item);
  }

  async getItem(key: SensorKey): Promise<SensorAttribute> {
    const data = await this.handler.readItem(this.tableName, key);
    if (data) {
      return data.Item;
    } else {
      throw new Error("そのようなItemは見つかりませんでした");
    }
  }
}
