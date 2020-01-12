import { useEffect, useState } from "react";
import { ApiClient } from "../../apis/ApiClient";

export default () => {
  const [value, setValue] = useState("");
  const onClickButton = async () => {
    const apiClient = new ApiClient();
    const value = await apiClient.getSensorValues("aaa");
    setValue(JSON.stringify(value));
  };
  return (
    <>
      <button onClick={onClickButton}>get values</button>
      <br />
      {value}
    </>
  );
};
