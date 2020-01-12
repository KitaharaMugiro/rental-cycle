import * as AWS from "aws-sdk";
import { DynamoDB } from "aws-sdk";
import * as util from "util";

AWS.config.update({
  region: "ap-northeast-1"
});

export class DynamoHandler {
  dynamodb: DynamoDB;

  constructor() {
    this.dynamodb = new AWS.DynamoDB();
  }

  createNewItem(table: string, item: any) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    var params = {
      TableName: table,
      Item: item
    };
    console.log("Adding a new item...");
    docClient.put(params, function(err, data) {
      if (err) {
        console.error(
          "Unable to add item. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log("Added item:", JSON.stringify(data, null, 2));
      }
    });
  }

  readItem(table: string, key: any) {
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: table,
      Key: key
    };
    const readItemPromise = util.promisify(docClient.get);
    try {
      return readItemPromise(params);
    } catch (err) {
      console.error(
        "Unable to read item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    }
  }

  deleteTable() {}

  createTable(
    tableName: string,
    keySchema: AWS.DynamoDB.KeySchema,
    attributeDefinitions: AWS.DynamoDB.AttributeDefinitions
  ) {
    const params = {
      TableName: tableName,
      KeySchema: keySchema,
      AttributeDefinitions: attributeDefinitions,
      ProvisionedThroughput: {
        ReadCapacityUnits: 2,
        WriteCapacityUnits: 2
      }
    };

    this.dynamodb.createTable(params, function(err: any, data: any) {
      if (err) {
        console.error(
          "Unable to create table. Error JSON:",
          JSON.stringify(err, null, 2)
        );
      } else {
        console.log(
          "Created table. Table description JSON:",
          JSON.stringify(data, null, 2)
        );
      }
    });
  }
}
