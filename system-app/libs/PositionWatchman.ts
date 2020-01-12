import { SensorDataWithoutId } from "./../../common/SensorValues";
export const PositionWatchman = (cb: (data: SensorDataWithoutId) => void) => {
  // 位置情報取得成功時の処理
  let successCallback = position => {
    console.log("success get position");
    const data = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      altitude: position.coords.altitude,
      positionAccuracy: position.coords.accuracy,
      direction: position.coords.heading,
      velocity: position.coords.speed
    };
    cb(data);
  };

  // 位置情報取得失敗時の処理
  const failureCallback = error => {
    let errorMessage = "";
    switch (error.code) {
      case 1:
        errorMessage = "位置情報の取得がユーザーに拒否されました";
        break;
      case 2:
        errorMessage = "位置情報が判定できません";
        break;
      case 3:
        errorMessage = "位置情報の取得処理がタイムアウトしました";
        break;
    }
    console.error(errorMessage);
  };

  //ユーザーの現在の位置情報を取得を実行
  navigator.geolocation.getCurrentPosition(successCallback, failureCallback);
  navigator.geolocation.watchPosition(successCallback, failureCallback);
};
