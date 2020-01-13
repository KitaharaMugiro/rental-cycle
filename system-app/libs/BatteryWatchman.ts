type batteryInfo = {
  charging: boolean;
  level: number;
  chargingTime: number;
  dischargingTime: number;
};

export const BatteryWatchman = async (cb: () => void) => {
  let isBatterySupported = "getBattery" in navigator;
  if (!isBatterySupported) {
    console.log("Battery not supported");
  } else {
    console.log("Battery is supported :)");
    console.log(navigator["getBattery"]());
    const battery = await navigator["getBattery"]();
    console.log(battery.charging);
    console.log(battery.level);
    console.log(battery.chargingTime);
    console.log(battery.dischargingTime);
  }
};
