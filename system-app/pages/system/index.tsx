import { useRouter } from "next/router";
import { WebSocketClient } from "../../libs/WebsocketClient";
import { useEffect, useState } from "react";
import { ApiClient } from "../../apis/ApiClient";
import { PositionWatchman } from "../../libs/PositionWatchman";
import { SensorDataWithoutId } from "../../../common/SensorValues";

export default () => {
  const router = useRouter();
  const [client, setClient] = useState<WebSocketClient>(undefined);
  const [sensorData, setSensorData] = useState<SensorDataWithoutId>();

  const id = router.query["id"] as string;
  useEffect(() => {
    const setUpWebsocket = async () => {
      const apiClient = new ApiClient();
      const url = await apiClient.getWebsocketUrl();
      const client = new WebSocketClient(url);
      setClient(client);
    };

    const positionWatch = () => {
      PositionWatchman(data => {
        setSensorData(data);
        //ここで何かのtriggerを発してsensorの値を送る
      });
    };

    setUpWebsocket();
    positionWatch();
  }, []);

  const sendSensorValues = () => {
    if (client) {
      client.sendSensorValues({
        systemAppId: id,
        ...sensorData
      });
    }
  };

  return (
    <div>
      ID: {id} <br />
      <button onClick={sendSensorValues}>センサー情報をwebsocketで送る</button>
    </div>
  );
};
