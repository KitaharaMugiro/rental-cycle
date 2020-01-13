import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SensorDataWithoutId } from "../../../common/SensorValues";
import { PositionWatchman } from "../../libs/PositionWatchman";
import { WebSocketClient } from "../../libs/WebsocketClient";
import { BatteryWatchman } from "../../libs/BatteryWatchman";

//need refactoring...
export default () => {
  const router = useRouter();
  const [sensorData, setSensorData] = useState<SensorDataWithoutId>();
  const [needSendData, setNeedSendData] = useState(true);

  const id = router.query["id"] as string;
  useEffect(() => {
    WebSocketClient.getInstance();
    PositionWatchman(data => {
      setSensorData(data);
      setNeedSendData(true);
    });
    BatteryWatchman(null);
  }, []);

  const sendSensorValues = () => {
    if (needSendData) {
      console.log("send sensor data to server");
      const client = WebSocketClient.getInstance();
      client.sendSensorValues({
        systemAppId: id,
        ...sensorData
      });
      setNeedSendData(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      sendSensorValues();
    }, 1000);
  });

  return (
    <div>
      ID: {id} <br />
      sensor: {JSON.stringify(sensorData)}
    </div>
  );
};
